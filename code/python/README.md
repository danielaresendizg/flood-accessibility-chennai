# Python (minimal helpers)

This project is mainly a **QGIS + DepthmapX** workflow. These small scripts document a few helper steps used in the appendix (mainly for preparing/validating inputs for the flood model).

## Scripts

- `flood_model/convert_dem_to_asc.py`  
  Converts a DEM from GeoTIFF to ASCII grid (`.asc`) using GDAL.

- `flood_model/convert_landcover_to_fric_asc.py`  
  Maps a landcover raster to Manning roughness values and exports an ASCII grid (`fric.asc`).

- `flood_model/convert_boundary_to_bdy.py`  
  Creates a simple `bdy.txt` (inflow/outflow points) from river/stream vectors.

- `flood_model/return_period_rainfall.py`  
  Fits Gumbel + GEV and estimates a 100-year return level rainfall per station.

- `flood_model/validate_layers.py`  
  Quick CRS/geometry checks for vector + raster inputs (expects EPSG:32644 by default).

## Notes

- These scripts assume you have the corresponding inputs available in your **Google Drive data folder** (see `DATA_SOURCES.md`).
- Dependencies are standard geospatial Python packages (e.g., `gdal`, `rasterio`, `geopandas`, `scipy`, `pandas`). Install method depends on your environment (conda is easiest for GDAL).

