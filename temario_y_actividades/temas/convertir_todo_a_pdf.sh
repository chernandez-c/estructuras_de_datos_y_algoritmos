#!/bin/bash
# =================================================================
# Convierte ficheros Markdown (.md) a PDF usando dos métodos:
# 1. Directo: MD -> PDF (lualatex)  [RECOMENDADO]
# 2. Dos pasos: MD -> HTML -> PDF (wkhtmltopdf)  [OPCIONAL]
#
# Busca ficheros con el patrón 'markdown/modulo*.md'.
# =================================================================
set -euo pipefail

# --- Configuración ---
readonly SRC_PATTERN="markdown/modulo*.md"
readonly HTML_DIR="html"
readonly PDF_DIR="pdf"
readonly HEADER_FILE="header.tex"
readonly JS_DELAY="4500" # Delay para wkhtmltopdf (ms)
readonly PANDOC_READER="markdown+tex_math_dollars+raw_tex"
readonly MATHJAX_CDN="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"

# --- Colores ---
readonly C_GREEN="\033[1;32m"
readonly C_YELLOW="\033[1;33m"
readonly C_BLUE="\033[1;34m"
readonly C_RED="\033[1;31m"
readonly C_RESET="\033[0m"

print_message() {
  local color="$1"; local message="$2"
  echo -e "${color}${message}${C_RESET}"
}

check_dependencies() {
  for cmd in "$@"; do
    if ! command -v "$cmd" &>/dev/null; then
      print_message "$C_RED" "❌ Error: No se encuentra '$cmd'."
      exit 1
    fi
  done
}

# === MÉTODO 1: MD -> PDF (LaTeX) ===
convert_direct_to_pdf() {
  local markdown_file="$1"
  local base_name; base_name=$(basename "${markdown_file%.md}")
  local pdf_file="${PDF_DIR}/${base_name}.pdf"

  print_message "$C_YELLOW" "▶️  Directo a PDF: '$markdown_file' → '$pdf_file'..."
  local -a pandoc_args=(
    "--from=$PANDOC_READER"
    "--pdf-engine=lualatex"
    "--toc"
    "--highlight-style=tango"
    "--number-sections"
    "-V" "mainfont=Noto Serif"
    "-V" "monofont=Noto Sans Mono"
    "-V" "sansfont=Noto Sans"
    "-V" "geometry=margin=2.5cm"
    "-V" "fontsize=12pt"
    "-V" "linestretch=1.2"
    "-V" "colorlinks=true"
    "-V" "linkcolor=blue"
    "-V" "citecolor=blue"
    "-V" "urlcolor=blue"
    "-V" "papersize=a4"
    "-V" "titlepage=true"
    "-V" "titlepage-color=eeeeff"
    "-V" "titlepage-text-color=000000"
    "-V" "titlepage-rule-height=2"
  )
  [[ -f "$HEADER_FILE" ]] && pandoc_args+=("-H" "$HEADER_FILE")
  pandoc "$markdown_file" -o "$pdf_file" "${pandoc_args[@]}"
}

# Paso 1: Markdown -> HTML (con MathJax)
convert_to_html() {
  local markdown_file="$1"
  local base_name; base_name=$(basename "${markdown_file%.md}")
  local html_file="${HTML_DIR}/${base_name}.html"

  print_message "$C_YELLOW" "▶️  MD → HTML: '$markdown_file' → '$html_file'..."
  pandoc "$markdown_file" -o "$html_file" \
    -s -t html5 \
    --from="$PANDOC_READER" \
    --mathjax="$MATHJAX_CDN"
  echo "$html_file"
}

# Paso 2: HTML -> PDF (wkhtmltopdf) [OPCIONAL]
convert_html_to_pdf() {
  local html_file="$1"
  local base_name; base_name=$(basename "${html_file%.html}")
  local pdf_file="${PDF_DIR}/${base_name}.pdf"

  print_message "$C_YELLOW" "▶️  HTML → PDF: '$html_file' → '$pdf_file'..."
  wkhtmltopdf \
    --enable-local-file-access \
    --javascript-delay "$JS_DELAY" \
    --no-stop-slow-scripts \
    --print-media-type \
    --margin-top 10mm --margin-right 10mm --margin-bottom 12mm --margin-left 10mm \
    "$html_file" "$pdf_file"
}

main() {
  print_message "$C_BLUE" "========================================="
  print_message "$C_BLUE" "     Conversor Markdown a PDF"
  print_message "$C_BLUE" "========================================="

  # Dependencias: pandoc y al menos una vía de PDF
  check_dependencies "pandoc"
  # Para el método 1:
  if ! command -v lualatex &>/dev/null; then
    print_message "$C_YELLOW" "⚠️  Aviso: 'lualatex' no está disponible. El método directo podría fallar."
  fi
  # Para el método 2:
  if ! command -v wkhtmltopdf &>/dev/null; then
    print_message "$C_YELLOW" "⚠️  Aviso: 'wkhtmltopdf' no está disponible para HTML→PDF."
  fi

  mkdir -p "$HTML_DIR" "$PDF_DIR"

  shopt -s nullglob
  local markdown_files=($SRC_PATTERN)
  local count=${#markdown_files[@]}

  if [ "$count" -eq 0 ]; then
    print_message "$C_YELLOW" "No se encontraron ficheros con el patrón '$SRC_PATTERN'."
    exit 0
  fi

  print_message "$C_YELLOW" "Se encontraron $count ficheros para convertir."

  for file in "${markdown_files[@]}"; do
    # Método 1: directo a PDF (preferido)
    convert_direct_to_pdf "$file"

    # HTML (útil para revisar y/o usar método 2)
    local html_path
    html_path=$(convert_to_html "$file")

    # Descomenta estas dos líneas si quieres también la ruta HTML→PDF:
    # if command -v wkhtmltopdf &>/dev/null; then
    #   convert_html_to_pdf "$html_path"
    # fi

    print_message "$C_GREEN" "✅ Terminado: $file"
  done

  print_message "$C_GREEN" "-----------------------------------------"
  print_message "$C_GREEN" "✅ Proceso completado. Se han convertido $count ficheros."
}

main
