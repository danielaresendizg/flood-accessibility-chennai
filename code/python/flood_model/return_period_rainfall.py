import argparse
from pathlib import Path

import numpy as np
import pandas as pd
import scipy.stats as st


def gumbel_return_level(rain_data: np.ndarray, return_period: int) -> float:
    if len(rain_data) < 5:
        return float("nan")
    loc, scale = st.gumbel_r.fit(rain_data)
    return float(loc - scale * np.log(-np.log(1 - 1 / return_period)))


def gev_return_level(rain_data: np.ndarray, return_period: int) -> float:
    if len(rain_data) < 5:
        return float("nan")
    shape, loc, scale = st.genextreme.fit(rain_data)
    return float(loc + (scale / shape) * ((-np.log(1 - 1 / return_period)) ** (-shape) - 1))


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Estimate return-period rainfall per station (Gumbel + GEV fits)."
    )
    parser.add_argument("--input", required=True, help="Input CSV (IMD stations)")
    parser.add_argument("--output", required=True, help="Output CSV path")
    parser.add_argument("--return-period", type=int, default=100, help="Return period (default: 100)")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(input_path)

    df["Date_1Day"] = pd.to_datetime(df["Date_1Day"], format="%d/%m/%y", errors="coerce")
    df["Date_2Day"] = pd.to_datetime(df["Date_2Day"], format="%d/%m/%y", errors="coerce")
    df["Date_3Day"] = pd.to_datetime(df["Date_3Day"], format="%d/%m/%y", errors="coerce")

    df_long_rainfall = pd.melt(
        df,
        id_vars=["Station"],
        value_vars=["RF_1Day", "RF_2Day", "RF_3Day"],
        var_name="Rainfall_Type",
        value_name="Rainfall",
    )
    df_long_dates = pd.melt(
        df,
        id_vars=["Station"],
        value_vars=["Date_1Day", "Date_2Day", "Date_3Day"],
        var_name="Rainfall_Type",
        value_name="Date",
    )
    df_long = pd.merge(df_long_rainfall, df_long_dates, on=["Station", "Rainfall_Type"])
    df_long.dropna(subset=["Rainfall", "Date"], inplace=True)
    df_long["Rainfall"] = pd.to_numeric(df_long["Rainfall"])
    df_long = df_long[df_long["Rainfall"] > 0]

    df_long["Year"] = df_long["Date"].dt.year
    df_max_annual = df_long.groupby(["Station", "Year"])["Rainfall"].max().reset_index()

    rp = int(args.return_period)
    df_final = df_max_annual.groupby("Station")["Rainfall"].apply(
        lambda x: pd.Series(
            {
                f"Rain_{rp}_Gumbel": gumbel_return_level(x.to_numpy(), rp),
                f"Rain_{rp}_GEV": gev_return_level(x.to_numpy(), rp),
            }
        )
    )
    df_final = df_final.reset_index()

    df_final.to_csv(output_path, index=False)
    print(f"OK: wrote {output_path}")


if __name__ == "__main__":
    main()

