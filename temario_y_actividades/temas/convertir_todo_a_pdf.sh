#!/bin/bash
# =================================================================
# Convierte ficheros Markdown (.md) a PDF usando dos metodos:
# 1. Directo: MD -> PDF (con lualatex, recomendado).
# 2. Dos pasos: MD -> HTML -> PDF (con wkhtmltopdf).
#
# Busca ficheros con el patron 'markdown/modulo*.md'.
# =================================================================
set -euo pipefail

# --- Configuracion ---
readonly SRC_PATTERN="markdown/modulo*.md"
readonly HTML_DIR="html"
readonly PDF_DIR="pdf"
readonly HEADER_FILE="header.tex"
readonly JS_DELAY="4500" # Delay para wkhtmltopdf

# --- Colores para los mensajes ---
readonly C_GREEN="\033[1;32m"
readonly C_YELLOW="\033[1;33m"
readonly C_BLUE="\033[1;34m"
readonly C_RESET="\033[0m"

# Muestra un mensaje con un color especifico.
print_message() {
  local color="$1"; local message="$2"
  echo -e "${color}${message}${C_RESET}"
}

# Verifica que los comandos necesarios esten instalados.
check_dependencies() {
  for cmd in "$@"; do
    if ! command -v "$cmd" &>/dev/null; then
      print_message "\033[1;31m" "❌ Error: El comando '$cmd' no se encuentra. Abortando."
      exit 1
    fi
  done
}

# === METODO 1: Conversion Directa (Recomendado) ===
convert_direct_to_pdf() {
  local markdown_file="$1"
  local base_name; base_name=$(basename "${markdown_file%.md}")
  local pdf_file="${PDF_DIR}/${base_name}.pdf"

  print_message "$C_YELLOW" "▶️  Convirtiendo a PDF (directo): '$markdown_file' → '$pdf_file'..."
  local -a pandoc_args=(
    "--from=gfm+tex_math_dollars" \
    "--pdf-engine=lualatex" \
    "--toc" \
    "--highlight-style=tango" \
    "--number-sections" \
    "-V" "mainfont=Noto Serif" \
    "-V" "monofont=Noto Sans Mono" \
    "-V" "sansfont=Noto Sans" \
    "-V" "geometry=margin=2.5cm" \
    "-V" "fontsize=12pt" \
    "-V" "linestretch=1.2" \
    "-V" "colorlinks=true" \
    "-V" "linkcolor=blue" \
    "-V" "citecolor=blue" \
    "-V" "urlcolor=blue" \
    "-V" "papersize=a4" \
    "-V" "titlepage=true" \
    "-V" "titlepage-color=eeeeff" \
    "-V" "titlepage-text-color=000000" \
    "-V" "titlepage-rule-height=2" \
  )
  [[ -f "$HEADER_FILE" ]] && pandoc_args+=("-H" "$HEADER_FILE")
  pandoc "$markdown_file" -o "$pdf_file" "${pandoc_args[@]}"
}

# Paso 1: Markdown a HTML
convert_to_html() {
  local markdown_file="$1"
  local base_name; base_name=$(basename "${markdown_file%.md}")
  local html_file="${HTML_DIR}/${base_name}.html"
  
  print_message "$C_YELLOW" "▶️  Conversion a HTML: '$markdown_file' → '$html_file'..."
  pandoc "$markdown_file" -o "$html_file" -s --mathjax
  
  # Devolvemos la ruta del HTML para el siguiente paso
  echo "$html_file"
}


#### NO FUNCIONA!! ####
#convert_html_to_pdf() {
#  local html_file="$1"
#  local base_name; base_name=$(basename "${html_file%.html}")
#  local pdf_file="${PDF_DIR}/${base_name}.pdf"
#
#  print_message "$C_YELLOW" "▶️  Paso 2: '$html_file' → '$pdf_file'..."
#  wkhtmltopdf --javascript-delay "$JS_DELAY" --enable-local-file-access "$html_file" "$pdf_file"
#}

# --- Funcion Principal ---
main() {
  print_message "$C_BLUE" "========================================="
  print_message "$C_BLUE" "     Conversor Markdown a PDF"
  print_message "$C_BLUE" "========================================="

  check_dependencies "pandoc" "wkhtmltopdf"
  mkdir -p "$HTML_DIR" "$PDF_DIR"

  shopt -s nullglob
  local markdown_files=($SRC_PATTERN)
  local count=${#markdown_files[@]}

  if [ "$count" -eq 0 ]; then
    print_message "$C_YELLOW" "No se encontraron ficheros con el patron '$SRC_PATTERN'."
    exit 0
  fi

  print_message "$C_YELLOW" "Se encontraron $count ficheros para convertir."

  for file in "${markdown_files[@]}"; do
  
    # Conversion independiente a pdf y html
    convert_direct_to_pdf "$file"

    convert_to_html "$file"
    print_message "$C_GREEN" "Se ha terminado de convertir $file"

    # MÉTODO 2: Podria extenderse a (MD -> HTML -> PDF). 
     #local html_path
     #html_path=$(convert_to_html "$file")
     #### NO FUNCIONA!! ####
     #convert_html_to_pdf "$html_path"

  done

  print_message "$C_GREEN" "-----------------------------------------"
  print_message "$C_GREEN" "✅ Proceso completado. Se han convertido $count ficheros."
}

# Ejecutar la funcion principal
main
