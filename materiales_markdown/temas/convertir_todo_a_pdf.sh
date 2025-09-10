#!/bin/bash

# =================================================================
# Script para convertir todos los ficheros Markdown (.md) de un
# directorio a PDF usando Pandoc.
# =================================================================

# Activa la opción 'nullglob' para que el bucle no se ejecute si no hay ficheros .md
shopt -s nullglob

# Contador para los ficheros convertidos
COUNT=0

# Bucle principal que itera sobre cada fichero .md
for markdown_file in *.md; do
  # Define el nombre del fichero de salida reemplazando la extensión .md por .pdf
  pdf_file="${markdown_file%.md}.pdf"

  echo "Convirtiendo: '$markdown_file' -> '$pdf_file'"

  # Ejecuta el comando de conversión de Pandoc
  pandoc "$markdown_file" -o "$pdf_file"

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
