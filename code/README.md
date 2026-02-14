# Code

This project is primarily a **GIS + Space Syntax workflow** using DepthmapX and QGIS. The code in this repository is intentionally minimal, focusing on data preparation and workflow documentation.

## Project Structure

```
code/
├── qgis/                           # QGIS projects + styles
│   ├── README.md                   # QGIS workflow documentation
│   ├── projects/                   # QGIS project files (.qgz)
│   │   ├── Chennai_analysis.qgz
│   │   ├── chennai_floods.qgz
│   │   ├── segment_analysis_chennai.qgz
│   │   └── simulations.qgz
│   │
│   └── styles/                     # QGIS style files (.qml)
│       ├── SSX_Colour_Range.qml
│       └── landcover.qml
│
└── python/                         # Helper scripts (flood model prep)
    ├── README.md                   # Python script documentation
    └── flood_model/                # Flood model utilities
        ├── convert_dem_to_asc.py   # Convert DEM to ASCII grid
        ├── convert_landcover_to_fric_asc.py  # Map landcover to Manning friction
        ├── convert_boundary_to_bdy.py        # Create boundary file
        ├── return_period_rainfall.py         # Estimate 100-year rainfall
        └── validate_layers.py                # Validate input layers
```

## Workflow Overview

### QGIS-Based Workflow

1. **Stage 1: Network Reconfiguration**
   - Use `segment_analysis_chennai.qgz` for street network setup
   - Import normal-condition street network (from DepthmapX output)
   - Apply flood penalties/removals using spatial overlays
   - Generate flood-conditioned accessibility metrics

2. **Stage 2: Exposure Overlays**
   - Use `Chennai_analysis.qgz` for critical systems integration
   - Overlay accessibility degradation with:
     - Land use / land cover
     - Health facilities (hospitals, clinics)
     - Education infrastructure (schools, colleges)
     - Informal settlements (slums)
     - Shelter locations + capacity
   - Classify exposure severity by service domain

3. **Stage 3: Global-Scale Resilience**
   - Use `simulations.qgz` for resilience strategy mapping
   - Integrate population density + critical infrastructure
   - Identify priority emergency corridors (NACHr3000)
   - Map WSUD (Water Sensitive Urban Design) zones using DEM + waterways

4. **Stage 4: Local-Scale Resilience**
   - Cluster analysis in flood-free zones (k-means clustering)
   - Evaluate shelter accessibility under flood conditions
   - Assess boat/water-based mobility options
   - Generate site-specific intervention maps

### Python Helper Scripts

Small Python utilities for data preparation and validation:

**`flood_model/convert_dem_to_asc.py`**
- Converts GeoTIFF DEM to ASCII grid format (.asc)
- Input: Digital Elevation Model (Copernicus GLO-30)
- Output: ASCII grid for flood model inputs
- Dependencies: GDAL, rasterio

**`flood_model/convert_landcover_to_fric_asc.py`**
- Maps landcover classes to Manning roughness coefficients
- Input: Landcover raster classification
- Output: Friction coefficient ASCII grid (fric.asc)
- Manning values: water=0.03, urban=0.05, vegetation=0.10, etc.

**`flood_model/convert_boundary_to_bdy.py`**
- Creates boundary definition file for flood model
- Input: River network / water body vectors
- Output: bdy.txt (inflow/outflow points)
- Used by flood simulation software

**`flood_model/return_period_rainfall.py`**
- Estimates 100-year return period rainfall
- Fits Gumbel and GEV distributions to rainfall timeseries
- Input: Historical rainfall station data
- Output: Return period rainfall estimates
- Dependencies: scipy, numpy, pandas

**`flood_model/validate_layers.py`**
- Quick validation checks for input datasets
- Verifies: CRS (expects EPSG:32644 for Chennai), geometry validity
- Checks: No null geometries, proper attribute fields
- Input: Vector/raster files from data folder
- Output: Validation report

## Running Python Scripts

### Setup

1. **Install dependencies:**
   ```bash
   pip install geopandas rasterio gdal scipy pandas numpy
   ```

   (For GDAL, conda is recommended: `conda install gdal`)

2. **Download data:**
   - See [../DATA_SOURCES.md](../DATA_SOURCES.md) for data access
   - Place data in folders referenced by scripts

3. **Update paths:**
   - Edit `BASE_PATH` variables in each script
   - Point to your local data download location

### Example: Validate Layers

```bash
cd flood_model/
python validate_layers.py
```

Expected output:
```
✓ Network layer: Valid (256 segments)
✓ Flood layer: Valid (CRS: EPSG:32644)
✓ DEM layer: Valid (30m resolution)
```

## Tools & Dependencies

**QGIS 3.x**
- Vector/raster processing
- Spatial joins and overlays
- Map layout and export

**DepthmapX 0.8.0** (external)
- Space Syntax segment analysis
- Generates NAIN/NACH metrics
- Output: Street network with angular centralities

**Python 3.8+** (for helper scripts)
- geopandas: Vector data manipulation
- rasterio: Raster I/O
- gdal: Geospatial data translation
- scipy: Statistical distributions (rainfall fitting)
- pandas: Data frame operations

**Data Formats**
- Vector: GPKG (GeoPackage, preferred), SHP, GeoJSON
- Raster: GeoTIFF, ASCII Grid (.asc)
- Projects: QGIS .qgz format

## Notes on Reproducibility

1. **QGIS Projects:** File paths are embedded in `.qgz` files. You'll need to re-link layers if your data location differs.
2. **DepthmapX Output:** Pre-processed network metrics are included in the data/ folder (no need to re-run DepthmapX unless you modify the network).
3. **Flood Model:** The 100-year return period model is from OpenCity Data (downloaded separately).
4. **Python Scripts:** Assume standard geospatial Python environment. Install via conda or pip.

## Questions or Issues?

- For QGIS workflow questions: See [qgis/README.md](qgis/README.md)
- For Python script issues: See [python/README.md](python/README.md)
- For data issues: See [../DATA_SOURCES.md](../DATA_SOURCES.md)
- Open an issue in the repository
