# Convertir los ficheros .md a .pdf

Para convertir a pdf necesitamos estas dependencias. Instalaremos un motor de LaTeX.

#### Aplicación para convertir markdown a otros formatos
```
sudo apt update
sudo apt install pandoc
```

#### Motor de LaTeX
```
sudo apt install texlive-full
```

#### Conversor html a pdf
```
sudo apt-get install -y wkhtmltopdf
```

## Modos de uso
Usando el script `./convertir_todo_a_pdf.sh` podemos generarlo. Existen 2 modos:
- Directamente .md ---> .pdf            Estilado de mucha mayor calidad siguiendo estándares LaTeX
- Directamente .md --->  .html ---> .pdf          Más soporte (emojis, caracteres unicode en general, html intermedio...)
