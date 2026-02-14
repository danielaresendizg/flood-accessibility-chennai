import argparse
from pathlib import Path

from osgeo import gdal


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert DEM GeoTIFF to ASCII grid (.asc).")
    parser.add_argument("--input", required=True, help="Input DEM GeoTIFF (.tif)")
    parser.add_argument("--output", required=True, help="Output ASCII grid path (.asc)")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    dataset = gdal.Open(str(input_path))
    if dataset is None:
        raise SystemExit(f"ERROR: Could not open input DEM: {input_path}")

    gdal.Translate(str(output_path), dataset, format="AAIGrid")
    print(f"OK: wrote {output_path}")


if __name__ == "__main__":
    main()

