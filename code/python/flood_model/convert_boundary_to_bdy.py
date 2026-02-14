import argparse
from pathlib import Path

import geopandas as gpd


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate a simple bdy.txt (inflow/outflow points) from river/stream vectors."
    )
    parser.add_argument("--rivers", required=True, help="Input rivers vector (e.g., .shp/.gpkg)")
    parser.add_argument("--streams", required=True, help="Input streams vector (e.g., .shp/.gpkg)")
    parser.add_argument("--output", required=True, help="Output bdy.txt path")
    args = parser.parse_args()

    rivers_path = Path(args.rivers).expanduser().resolve()
    streams_path = Path(args.streams).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    rivers = gpd.read_file(rivers_path)
    streams = gpd.read_file(streams_path)

    rivers_pts = rivers.geometry.centroid
    streams_pts = streams.geometry.centroid

    with open(output_path, "w", encoding="utf-8") as bdy_file:
        bdy_file.write("# Boundary conditions for LISFLOOD-FP\n")
        for point in rivers_pts:
            bdy_file.write(f"{point.x} {point.y} inflow\n")
        for point in streams_pts:
            bdy_file.write(f"{point.x} {point.y} outflow\n")

    print(f"OK: wrote {output_path}")


if __name__ == "__main__":
    main()

