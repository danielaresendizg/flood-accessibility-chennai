import argparse
from pathlib import Path

import numpy as np
import rasterio


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Convert a landcover raster to Manning roughness (friction) ASCII grid."
    )
    parser.add_argument("--input", required=True, help="Input landcover raster (.tif)")
    parser.add_argument("--output", required=True, help="Output ASCII grid (.asc)")
    parser.add_argument(
        "--cellsize",
        type=float,
        default=30.0,
        help="Cellsize to write in ASC header (default: 30)",
    )
    parser.add_argument(
        "--nodata",
        type=float,
        default=-9999.0,
        help="NODATA value to write in ASC header (default: -9999)",
    )
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Manning roughness mapping by landcover class (edit as needed).
    # Example:
    # 1=Water, 2=Urban, 3=Forest, 4=Grassland, 5=Agriculture
    roughness = {
        1: 0.015,
        2: 0.030,
        3: 0.100,
        4: 0.040,
        5: 0.025,
    }

    with rasterio.open(input_path) as src:
        landcover = src.read(1)
        landcover = np.where(np.isnan(landcover), args.nodata, landcover).astype(int)

    default_value = args.nodata
    vectorized_map = np.vectorize(lambda v: roughness.get(int(v), default_value))
    fric = vectorized_map(landcover)

    nrows, ncols = fric.shape
    with open(output_path, "w", encoding="utf-8") as asc_file:
        asc_file.write(f"ncols {ncols}\n")
        asc_file.write(f"nrows {nrows}\n")
        asc_file.write(f"cellsize {args.cellsize}\n")
        asc_file.write(f"NODATA_value {args.nodata}\n")
        for row in fric:
            asc_file.write(" ".join(map(str, row)) + "\n")

    print(f"OK: wrote {output_path}")


if __name__ == "__main__":
    main()

