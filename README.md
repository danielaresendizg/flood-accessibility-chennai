# Severed Accessibility and Urban Resilience
**A multi-scalar analysis of flood risk in Chennai, India**

BARC0026: Analytical Design Research Project | MSc in Space Syntax: Architecture and Cities | The Bartlett School of Architecture, UCL

**Author:** Daniela Resendiz Garcia | **Supervisor:** Prof. Alan Penn

---

## Abstract

Flooding is a rapidly intensifying urban challenge, disrupting essential services and exposing structural inequalities across cities worldwide. This study introduces a spatial methodology that models accessibility loss under extreme flood conditions, integrating a 100-year return period scenario with network-based spatial analysis (Space Syntax). Applied to Chennai, the approach overlays flood impact on road networks, land use, and critical infrastructure to assess where functional accessibility collapses. A clustering analysis identifies priority zones for safe shelter allocation and evacuation planning.

Results show that accessibility degradation is spatially uneven: compact urban forms retain greater connectivity under stress, while dispersed or fragmented areas become structurally isolated. The method reframes resilience not as physical resistance to flooding, but as the preservation of spatial connection under disruption. It is transferable to diverse urban contexts and leverages open-access data, enabling scalable diagnostics without proprietary inputs.

## Research Questions

1. How do floods reshape the spatial accessibility of urban street networks?
2. How does the reconfigured urban structure affect critical systems (health, education, land use, slums, shelters)?
3. How can resilience be improved at both global and local scales by strategically enhancing accessibility to critical services during flood events?

## Methodology

<p align="center">
  <img src="docs/diagrams/methodology_framework_chennai.png" width="90%" alt="Methodological framework">
</p>

The analysis follows four stages:

| Stage | Description |
|:-----:|-------------|
| **1** | Flood overlay on street network (100-year return period; segment penalties and deletions) to produce flood-conditioned accessibility at r3000 and r800 |
| **2** | Exposure overlays across land use, health, education, slums, and shelters with four-tier risk classification |
| **3** | Global-scale resilience: priority emergency corridors, floodplain interventions, and water-sensitive urban design zones |
| **4** | Local-scale resilience: k-means clustering for safe zones, shelter evaluation, and emergency boat deployment assessment |

## Key Results

**Accessibility under normal vs. flood conditions (r3000 and r800)**
<p align="center">
  <img src="figures/readme/chennai_maps_p02_accessibility.png" width="95%" alt="Accessibility comparison: normal vs flood conditions">
</p>

Global accessibility (NAINr3000) dropped by **19.74%** and local accessibility (NAINr800) by **15.23%** under a 100-year flood scenario, with 6.56% of street segments lost entirely.

**Population density, accessibility, and safe zone identification**
<p align="center">
  <img src="figures/readme/chennai_maps_p04_density_accessibility.png" width="95%" alt="Population density and accessibility analysis">
</p>

**Shelter evaluation and priority emergency corridors**
<p align="center">
  <img src="figures/readme/chennai_maps_p05_shelters.png" width="48%" alt="Safe zones and shelter evaluation">
  <img src="figures/readme/chennai_maps_p06_priority_corridors.png" width="48%" alt="Priority emergency corridors">
</p>

48.6% of existing shelters were located over 400 m from highly accessible areas, highlighting critical gaps in emergency infrastructure planning.

## Repository Structure

```
flood-accessibility-chennai/
├── latex/                          # LaTeX paper source
│   ├── main.tex                    # Main document
│   ├── sections/                   # Paper sections (01-06)
│   ├── figures/                    # Paper figures
│   └── references.bib              # Bibliography
│
├── papers/                         # Final PDF outputs
│   ├── 210525_ADRP_DanielaResendiz.pdf   # Original submission
│   ├── ADRP_Chennai_2025_Resendiz.pdf    # LaTeX-compiled version
│   └── Appendix_A_Methods.pdf            # Supplementary methods
│
├── code/
│   ├── python/flood_model/         # Data preparation scripts
│   └── qgis/                       # QGIS projects and styles
│
├── figures/readme/                 # Figures for this README
├── docs/diagrams/                  # Methodology diagram (TikZ source + PNG)
├── DATA_SOURCES.md                 # Data access and download guide
└── requirements.txt                # Python dependencies
```

## Data

Large geospatial datasets (~800 MB) are hosted on Google Drive:

**[Download project data](https://drive.google.com/open?id=1cVT_UkIAJWT-I-wsGkITIKPlJPdiMdUH&usp=drive_fs)**

Includes: street networks, flood model layers, DEM, waterways, building footprints, land use, and critical services. For full details see [DATA_SOURCES.md](DATA_SOURCES.md).

## Software

- **DepthmapX 0.8.0** -- Space Syntax segment analysis (NAIN, NACH)
- **QGIS 3.x** -- GIS overlay, network analysis, map composition
- **Python 3.x** -- Data preparation (`geopandas`, `rasterio`, `gdal`)
- **LaTeX** -- Paper compilation (`latexmk -pdf`)

## Compile the Paper

```bash
cd latex && latexmk -pdf
```

Output: `latex/_build/main.pdf`

## Citation

```bibtex
@mastersthesis{resendiz2025flood,
  author  = {Resendiz Garcia, Daniela},
  title   = {Severed Accessibility and Urban Resilience:
             A multi-scalar analysis of flood risk in Chennai},
  school  = {UCL The Bartlett School of Architecture},
  year    = {2025},
  type    = {{BARC0026} Analytical Design Research Project},
  url     = {https://github.com/danielaresendizg/flood-accessibility-chennai}
}
```

## License

MIT License -- see [LICENSE](LICENSE).

## Acknowledgments

Supervisor: Prof. Alan Penn (UCL The Bartlett). Data: OpenStreetMap, Google Open Buildings, Copernicus GLO-30, India WRIS, Greater Chennai Corporation.
