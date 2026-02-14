# Data Sources and Availability

This document explains how to access all datasets used in this project for full reproducibility.

## Data Sharing Strategy

Due to GitHub's file size limitations (files > 100MB), large geospatial datasets are hosted on Google Drive. This is standard practice for spatial research with large datasets.

## Dataset Categories

### 1. **Included in Repository** (GitHub)

Small reference files and metadata (< 1MB total):

- `data/README.md` - Data access documentation
- Minimal sample data for quick reference (if applicable)
- All documentation, code, and diagrams

### 2. **External Data (Google Drive)**

Large processed datasets (~800 MB total) organized by analysis stage:

#### **A. Street Network** (150 MB)
**Source:** OpenStreetMap (OSM) + Space Syntax analysis
**Access:** [Google Drive - Network](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- Cleaned street network geometries (GPKG)
- Segment analysis outputs from DepthmapX
- Angular metrics: NAIN, NACH at multiple radii (r800, r3000)
- Normal condition vs. flood-adjusted network

**Original Source:**
- [OpenStreetMap](https://www.openstreetmap.org/) - Chennai extract
- Processed with [DepthmapX 0.8.0](https://github.com/SpaceGroupUCL/depthmapX)

#### **B. Flood Hazard Data** (200 MB)
**Source:** OpenCity Data (100-year return period model)
**Access:** [Google Drive - Flood](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- 100-year return period flood extent (raster)
- Flood depth grids
- Water level scenarios
- Penalty classifications (high/moderate/low impact)

**Processing Notes:**
- Raster to vector conversion for network overlay
- Penalties applied to street segments: 100% (removed), 75% (moderate), 25% (low)

#### **C. Digital Elevation Model (DEM)** (150 MB)
**Source:** Copernicus GLO-30
**Access:** [Google Drive - DEM](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- 30m resolution DEM for Chennai study area
- Used for watershed/drainage analysis
- WSUD (Water Sensitive Urban Design) zone identification

**Original Source:**
- [Copernicus Global Land Service](https://www.copernicus.eu/)

#### **D. Hydrological & Waterway Data** (80 MB)
**Source:** India Water Resources Information System + manual delineation
**Access:** [Google Drive - Hydrology](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- River/stream network (Adyar, Cooum, Kosasthalairy rivers)
- Waterway centerlines + banklines
- Water body polygons (tanks, ponds, reservoirs)
- Drainage infrastructure (canals, culverts)

**Original Source:**
- [India Water Resources Information System (WRIS)](https://wris.nrsc.gov.in/)

#### **E. Urban Morphology & Buildings** (120 MB)
**Source:** Google Open Buildings + census data
**Access:** [Google Drive - Buildings](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- Building footprint geometries (GPKG)
- Aggregated to block level (density, coverage)
- Used for morphology + resilience assessment

**Original Source:**
- [Google Open Buildings](https://sites.research.google/open-buildings/)

#### **F. Land Use & Critical Services** (100 MB)
**Source:** Greater Chennai Corporation (GCC) + OSM + manual mapping
**Access:** [Google Drive - Services](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- Land-use / land-cover classification (raster)
- Health facilities (hospitals, health centers)
- Education infrastructure (schools, colleges)
- Informal settlements / slums (polygon layer)
- Emergency shelters (point locations + capacity)

**Coverage:** Mapped at neighborhood level for resilience assessment

#### **G. Administrative Boundaries** (80 MB)
**Source:** GCC, Census of India, Survey of India
**Access:** [Google Drive - Boundaries](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- Chennai city boundary
- Ward/zone polygons (administrative divisions)
- Study area polygon (Adyar River basin)
- Buffer zones for context

#### **H. Exported Maps & Final Products** (200 MB)
**Source:** QGIS merged outputs
**Access:** [Google Drive - Exports](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)
**Contents:**
- Merged accessibility layers (normal + flood conditions)
- Priority corridor maps (raster + vector)
- Safe zone polygons + shelter cluster assignments
- WSUD intervention zone maps
- Map atlases (PDF) used for figures

### 3. **Publicly Available Data (No Download Needed)**

These datasets can be accessed directly:

#### **Google Open Buildings**
- Vector building footprints
- Access via: [Google Open Buildings Dataset](https://sites.research.google/open-buildings/)

#### **OpenStreetMap**
- Street network, water bodies, points of interest
- Download from: [Geofabrik](https://download.geofabrik.de/asia/india.html)

#### **Copernicus DEM**
- 30m global DEM
- Access via: [Copernicus Browser](https://browser.dataspace.copernicus.eu/) or [USGS Earth Explorer](https://earthexplorer.usgs.gov/)

#### **India Water Resources Information System**
- Hydrological data, water bodies
- Access: [WRIS Portal](https://wris.nrsc.gov.in/)

## How to Reproduce This Research

### Option 1: Use Processed Data (Recommended)
1. Download processed datasets from Google Drive links above
2. Update file paths in QGIS projects to point to your download location
3. Open QGIS projects in `code/qgis/projects/` for analysis/mapping

### Option 2: Process from Raw Sources
1. Download raw data from original sources (OSM, Google Buildings, Copernicus, etc.)
2. Run Python scripts in `code/python/flood_model/` for data preparation
3. Perform network analysis with DepthmapX (manual workflow)
4. Create accessibility layers and overlays in QGIS
5. Export final maps using provided QGIS projects as template

## Data Size Reference

| Dataset Category | Size | Repository Location |
|------------------|------|-------------------|
| GitHub (code + docs) | ~2 MB | This repository |
| Sample data (GitHub) | ~1 MB | `data/` |
| **Google Drive (processed data)** | **~800 MB** | Links above |
| Raw source data (if downloaded) | ~2-5 GB | Original sources |

## Citation

If you use these datasets, please cite the original data providers:

```bibtex
@mastersthesis{resendiz2025flood,
  author       = {Resendiz Garcia, Daniela},
  title        = {Severed Accessibility and Urban Resilience:
                  A multi-scalar analysis of flood risk in Chennai},
  school       = {UCL The Bartlett School of Architecture},
  year         = {2025},
  url          = {https://github.com/danielaresendizg/flood-accessibility-chennai}
}
```

Also cite original data sources:
- **OSM:** OpenStreetMap contributors
- **Google Buildings:** Google Open Buildings dataset
- **Copernicus DEM:** EU Copernicus Programme
- **Flood Data:** OpenCity Data
- **Services/Slums:** Greater Chennai Corporation

## Data Privacy and Ethics

All datasets used are:
- Publicly available government data (GCC, WRIS)
- Open data (OpenStreetMap, Google Open Buildings, Copernicus)
- Aggregate/area-level statistics (no individual-level personal data)

No personal or sensitive information is included.

## Questions or Issues?

- For data access problems: Open an issue in this repository
- For technical questions about datasets: Consult original source documentation
- For methodology questions: See paper methodology section or contact author

## Data Archive & Long-term Preservation

For permanent availability beyond Google Drive:
- **Zenodo deposit:** [Link to be added]
- **UCL Research Data Repository:** [Link to be added]

These will ensure datasets remain accessible even if cloud links become inactive.

## Local Data Location (Author Machine)

Full project datasets are backed up locally at:
`/Users/danielaresendiz/Library/CloudStorage/OneDrive-UniversityCollegeLondon(2)/SSMAD_2/Project`

This is for reference only; the Google Drive link above is the primary access point.
