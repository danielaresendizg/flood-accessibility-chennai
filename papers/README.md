# Papers

This folder contains PDF outputs derived from the LaTeX source in `../latex/`.

## BARC0026 Analytical Design Research Project (Chennai, 2021)

### Final Submission

- **`210525_ADRP_DanielaResendiz.pdf`** (8 MB)
  - Final coursework submission to UCL (dated 25 May 2021)
  - Title: *Severed Accessibility and Urban Resilience: A multi-scalar analysis of flood risk in Chennai*
  - Pages: 25 + appendix
  - Supervisor: Prof. Alan Penn

- **`Appendix_A_Methods.pdf`** (63 KB)
  - Supplementary methods appendix
  - Additional technical documentation and processing notes

### Repository Build

- **`ADRP_Chennai_2021_Resendiz.pdf`** (6 MB)
  - Compiled from LaTeX source in `../latex/`
  - Note: **Not the original submission layout** — rebuild includes updated formatting
  - Useful for referencing against source `.tex` files
  - Compile locally: `cd ../latex && latexmk -pdf`

## How to Use

**For citation:** Use the final submission PDF (`210525_ADRP_DanielaResendiz.pdf`)

**For reference/methods:** Use appendix (`Appendix_A_Methods.pdf`)

**For reproducing source:** Use repository build or LaTeX source in `../latex/`

## Citation

```bibtex
@mastersthesis{resendiz2021flood,
  author       = {Resendiz Garcia, Daniela},
  title        = {Severed Accessibility and Urban Resilience:
                  A multi-scalar analysis of flood risk in Chennai},
  school       = {UCL The Bartlett School of Architecture},
  year         = {2021},
  note         = {BARC0026 Analytical Design Research Project, dated 2025-05},
  url          = {https://github.com/danielaresendizg/flood-accessibility-chennai}
}
```

## Compiling from Source

To regenerate PDFs from LaTeX:

```bash
cd ../latex
latexmk -pdf main.tex
```

Outputs will be placed in `_build/main.pdf` (and copied to this folder via build script).

**Requirements:**
- TeX Live / MiKTeX installation
- Python 3 (for Makefile if used)
- Bibtex (for bibliography)

**Sections included:**
- Introduction
- Literature Review
- Methodology
- Results and Analysis
- Discussion
- Conclusion
- References

See `../latex/` for source files.
