# Python Helpers

This project is mainly a **QGIS + DepthmapX** workflow. These Python scripts are small utilities for data preparation and validation—primarily for preparing inputs to the flood model and checking data integrity.

## Scripts Overview

### Flood Model Preparation

#### **`flood_model/convert_dem_to_asc.py`**
Converts DEM from GeoTIFF to ASCII grid format (`.asc`).

**Purpose:** Flood simulation software (e.g., LISFLOOD-FP, HEC-RAS) often requires DEM in ASCII grid format.

**Input:** GeoTIFF DEM file (e.g., Copernicus GLO-30)

**Output:** ASCII grid (`.asc`) with matching extent and resolution

**Usage:**
```bash
python convert_dem_to_asc.py --input dem.tif --output dem.asc
```

**Dependencies:** GDAL, rasterio

---

#### **`flood_model/convert_landcover_to_fric_asc.py`**
Maps landcover classes to Manning roughness coefficients.

**Purpose:** Manning friction coefficients control water resistance in flood models; different land covers have different roughness values.

**Input:** Landcover raster (categorical classification)

**Output:** Friction coefficient ASCII grid (`fric.asc`)

**Manning Values Mapping:**
- Water: 0.03
- Urban (buildings, paved): 0.05
- Vegetation (trees, grass): 0.10
- Bare soil: 0.04

**Usage:**
```bash
python convert_landcover_to_fric_asc.py --input landcover.tif --output fric.asc
```

**Dependencies:** GDAL, rasterio, numpy

---

#### **`flood_model/convert_boundary_to_bdy.py`**
Creates boundary definition file for flood model (inflow/outflow points).

**Purpose:** Defines where water enters and exits the domain during simulation.

**Input:** River/stream network (vector file, shapefile or GeoPackage)

**Output:** `bdy.txt` file with inflow/outflow coordinates

**Output Format:**
```
# Inflow points
X1 Y1
X2 Y2

# Outflow points
X3 Y3
X4 Y4
```

**Usage:**
```bash
python convert_boundary_to_bdy.py --input rivers.gpkg --output bdy.txt
```

**Dependencies:** geopandas, shapely

---

#### **`flood_model/return_period_rainfall.py`**
Estimates 100-year return period rainfall from historical timeseries.

**Purpose:** The flood model uses design rainfall (100-year event) to generate the inundation extent. This script estimates that rainfall from weather station data.

**Distributions Fitted:**
- Gumbel (traditional extreme value distribution)
- GEV (Generalized Extreme Value, more flexible)

**Input:** Historical rainfall data (CSV with dates and daily rainfall mm)

**Output:** Estimated 100-year rainfall value(s)

**Example Data Format:**
```
date,rainfall_mm
2010-01-01,0.0
2010-01-02,15.3
2010-01-03,8.7
...
```

**Usage:**
```bash
python return_period_rainfall.py --input rainfall_stations.csv --output return_periods.csv
```

**Output Example:**
```
station,gumbel_100yr,gev_100yr,recommended
Station_A,250.5,248.3,249.4
Station_B,260.1,262.8,261.5
```

**Dependencies:** scipy, numpy, pandas

---

#### **`flood_model/validate_layers.py`**
Quick validation checks for all input datasets.

**Purpose:** Ensures data integrity before analysis—checks CRS, geometries, missing values, etc.

**Checks Performed:**
- **CRS:** Expects EPSG:32644 (Chennai, UTM Zone 44N)
- **Geometry:** No null/invalid geometries
- **Extent:** Layers overlap correctly
- **Attributes:** Required fields present
- **Format:** Vector (GPKG/SHP) or raster (GeoTIFF)

**Input:** All data files from `data/` folder

**Output:** Validation report (console + optional CSV)

**Usage:**
```bash
python validate_layers.py --data-folder /path/to/data/
```

**Example Output:**
```
✓ Network layer: Valid (256 segments, CRS: EPSG:32644)
✓ Flood layer: Valid (2000x1500 pixels, 30m resolution)
✓ DEM layer: Valid (extent matches network)
✗ Land use: Missing attribute 'class_code'
⚠ Shelters: 3 duplicate points detected
```

**Dependencies:** geopandas, rasterio

---

## Installation & Setup

### 1. Install Dependencies

**Option A: Conda (recommended for GDAL)**
```bash
conda create -n flood-analysis python=3.9
conda activate flood-analysis
conda install -c conda-forge gdal geopandas rasterio scipy pandas numpy
```

**Option B: Pip (if GDAL already available)**
```bash
pip install geopandas rasterio scipy pandas numpy
```

### 2. Download Data

See [../../DATA_SOURCES.md](../../DATA_SOURCES.md) for data access instructions.

### 3. Update Paths

Edit each script's `BASE_PATH` variable to match your local data location:
```python
BASE_PATH = Path("/Users/you/Downloads/Chennai_Flood_Accessibility_Data")
```

### 4. Run Validation

```bash
cd flood_model/
python validate_layers.py --data-folder $BASE_PATH
```

---

## Workflow Integration

### When to Use These Scripts

1. **Start:** Download data from Google Drive
2. **Validate:** `python validate_layers.py` — check data integrity
3. **Prepare:** `python convert_*.py` — prepare inputs for flood model
4. **Model:** Run flood model (external software, not in this repo)
5. **Analyze:** Import flood results into QGIS projects (Stage 1)

### Typical Pipeline

```
rainfall_stations.csv
    ↓
return_period_rainfall.py → 100yr_rainfall.csv

landcover.tif
    ↓
convert_landcover_to_fric_asc.py → fric.asc (flood model input)

dem.tif
    ↓
convert_dem_to_asc.py → dem.asc (flood model input)

rivers.gpkg
    ↓
convert_boundary_to_bdy.py → bdy.txt (flood model input)

[Flood Model Run]
    ↓
flood_extent.tif
    ↓
Import to QGIS → overlay on network → accessibility analysis
```

---

## File Locations & Naming

**Input Data** (from Google Drive `data/` folder):
- DEM: `dem/Copernicus_GLO30_Chennai.tif`
- Landcover: `land_use/landcover_classification.tif`
- Rivers: `hydrology/rivers_network.gpkg`
- Rainfall: `climate/rainfall_stations_1980-2020.csv`

**Outputs** (generated by scripts):
- DEM ASCII: `dem.asc`
- Friction grid: `fric.asc`
- Boundary points: `bdy.txt`
- Return periods: `return_periods_100yr.csv`

---

## Troubleshooting

**"GDAL not found"**
- Use conda: `conda install -c conda-forge gdal`
- Or ensure OSGeo binaries are in PATH

**"Invalid CRS / geometry errors"**
- Run `validate_layers.py` first to identify issues
- Check that all inputs are EPSG:32644
- Use `ogr2ogr` or QGIS to reproject if needed

**"Script hangs or crashes"**
- Check file permissions (readable input files)
- Verify file paths are correct
- Try with a smaller test dataset first

---

## Related Documentation

- [../../DATA_SOURCES.md](../../DATA_SOURCES.md) - Data download and setup
- [../README.md](../README.md) - Code workflow overview
- [../qgis/README.md](../qgis/README.md) - QGIS projects and analysis
- [../../README.md](../../README.md) - Main project documentation

---

## Questions?

- For script issues: Check error message and consult comments in script
- For data questions: See [../../DATA_SOURCES.md](../../DATA_SOURCES.md)
- For workflow questions: Open an issue in the repository

