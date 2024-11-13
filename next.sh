#!/bin/bash

# This works for Next.js projects
# Put this in the root folder of your project
# Run the command chmod +x get_code_context.sh
# Then run ./get_code_context.sh

# Use the current directory as the project directory
project_dir=$(pwd)

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# List of directories to look for based on your directory structure
# Exclude "public", "node_modules", and "assets/images" directories
directories=("app" "components/ui" "config" "lib" "models")

# List of root files to include
root_files=("next.config.mjs" "tsconfig.json" "package.json" ".env" "tailwind.config.js" "postcss.config.js")

# List of file types to ignore
ignore_files=(".ttf" "*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg")

# Function to append a file's content to the output file
append_file() {
  relative_path=$1
  full_path=$2
  echo "// File: $relative_path" >> "$output_file"
  cat "$full_path" >> "$output_file"
  echo "" >> "$output_file"
}

# Process specific files in the project root first
for file in "${root_files[@]}"; do
  if [ -f "${project_dir}/${file}" ]; then
    echo "Processing file: ${project_dir}/${file}"  # Debugging line
    append_file "$file" "${project_dir}/${file}"
  else
    echo "File not found: ${project_dir}/${file}"  # Debugging line
  fi
done

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*
  do
    if [ -d "$entry" ]; then
      # If entry is a directory, call this function recursively
      # Skip excluded directories
      if [[ "$entry" != *"public"* && "$entry" != *"node_modules"* && "$entry" != *"assets/images"* ]]; then
        read_files "$entry"
      fi
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      should_ignore=false
      for ignore_pattern in "${ignore_files[@]}"; do
        if [[ "$entry" == $ignore_pattern ]]; then
          should_ignore=true
          break
        fi
      done

      # If the file type should not be ignored, append its relative path and content to the output file
      if ! $should_ignore; then
        relative_path=${entry#"$project_dir/"}
        append_file "$relative_path" "$entry"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    echo "Processing directory: ${project_dir}/${dir}"  # Debugging line
    read_files "${project_dir}/${dir}"
  else
    echo "Directory not found: ${project_dir}/${dir}"  # Debugging line
  fi
done
