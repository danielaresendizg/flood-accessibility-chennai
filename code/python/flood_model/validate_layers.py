import argparse
from pathlib import Path

import geopandas as gpd
import rasterio


def validate_vector(file_path: Path, expected_crs: str) -> None:
    gdf = gpd.read_file(file_path)
    crs_ok = (gdf.crs is not None) and (gdf.crs.to_string() == expected_crs)
    valid_geoms = bool(gdf.is_valid.all())
    geometry_types = list(gdf.geom_type.unique())
    empty_table = bool(gdf.empty)

    print(f"\n{file_path.name}")
    print(f"  - CRS correct: {'YES' if crs_ok else 'NO'} ({gdf.crs})")
    print(f"  - Geometry valid: {'YES' if valid_geoms else 'NO'}")
    print(f"  - Geometry types: {geometry_types}")
    print(f"  - Empty: {'YES' if empty_table else 'NO'}")


def validate_raster(file_path: Path, expected_crs: str) -> None:
    with rasterio.open(file_path) as src:
        crs_ok = (src.crs is not None) and (src.crs.to_string() == expected_crs)
        print(f"\n{file_path.name}")
        print(f"  - CRS correct: {'YES' if crs_ok else 'NO'} ({src.crs})")
        print(f"  - Dimensions: {src.width} x {src.height} px")
        print(f"  - Resolution: {src.res}")
        print(f"  - Bands: {src.count}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Quick CRS/geometry checks for input layers.")
    parser.add_argument("--expected-crs", default="EPSG:32644", help="Expected CRS (default: EPSG:32644)")
    parser.add_argument("--vector", action="append", default=[], help="Vector path (repeatable)")
    parser.add_argument("--raster", action="append", default=[], help="Raster path (repeatable)")
    args = parser.parse_args()

    expected_crs = str(args.expected_crs)
    for vector_path in args.vector:
        validate_vector(Path(vector_path).expanduser().resolve(), expected_crs)
    for raster_path in args.raster:
        validate_raster(Path(raster_path).expanduser().resolve(), expected_crs)


if __name__ == "__main__":
    main()

