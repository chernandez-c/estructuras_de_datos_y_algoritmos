#!/bin/bash

# =================================================================
# Script para convertir todos los ficheros Markdown (.md) de un
# directorio a PDF usando Pandoc.
# =================================================================
set -euo pipefail

# Activa la opción 'nullglob' para que el bucle no se ejecute si no hay ficheros .md
shopt -s nullglob

# Contador para los ficheros convertidos
COUNT=0

command -v pandoc >/dev/null || { echo "Falta pandoc"; exit 1; }
command -v wkhtmltopdf >/dev/null || { echo "Falta wkhtmltopdf"; exit 1; }

#katex_repo="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11"
#if curl --output /dev/null --silent --head --fail $katex_repo; then
#  echo "✅ KaTeX CDN is available"
#  # run your script here
#else
#  echo "❌ KaTeX CDN is not reachable"
#  exit 1
#fi


# Bucle principal que itera sobre cada fichero .md
for markdown_file in modulo*.md; do
  # Define el nombre del fichero de salida reemplazando la extensión .md por .pdf
  html_file="${markdown_file%.md}.html"
  pdf_file="${markdown_file%.md}.pdf"

  ## =================================================== ## 
  #    Conversión directa a pdf que da error por emojis   #
  ## =================================================== ## 



  cmd="pandoc \"$markdown_file\" \
  -o \"$pdf_file\" \
  --from gfm+tex_math_dollars \
  --pdf-engine=lualatex \
  --toc \
  --highlight-style=tango \
  -V mainfont='Noto Serif' \
  -V monofont='Noto Sans Mono' \
  -V sansfont='Noto Color Emoji' \
  -V geometry:margin=2.5cm \
  -H header.tex"

  echo -e "\033[1;32mConvirtiendo...'$markdown_file' -> '$pdf_file' \033[0m"
  echo -e "\033[1;32m$cmd\033[0m"
    # Convertimos a pdf
  eval "$cmd"


  ## =================================================== ## 
  #            Conversión con html intermedio             #
  ## =================================================== ## 

  # Comandos correctos (mismo nombre al usarlos)
  cmd1=(pandoc "$markdown_file" -o "$html_file" -s \
  -f gfm+tex_math_dollars \
  --katex=$katex_repo)

  cmd2="wkhtmltopdf --enable-local-file-access --javascript-delay 1500 \"$html_file\" \"$pdf_file\" "

  echo -e "\033[1;32mConvirtiendo… '$markdown_file' → '$html_file'\033[0m"
  echo -e "\033[1;32m$cmd1\033[0m"
  set -x
  eval "$cmd1"
  set +x
  echo -e "\033[1;32mConvirtiendo… '$html_file' → '$pdf_file'\033[0m"
  echo -e "\033[1;32m$cmd2\033[0m"
  eval "$cmd2"

  echo -e "\033[1;32mListo: $pdf_file\033[0m"

    # Incrementa el contador
    COUNT=$((COUNT + 1))
  done

# Mensaje final al usuario
if [ "$COUNT" -eq 0 ]; then
  echo "No se encontraron ficheros .md en este directorio."
else
  echo "----------------------------------------------------"
  echo "✅ Proceso completado. Se han convertido $COUNT ficheros."
fi
