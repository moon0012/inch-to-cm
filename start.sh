#!/bin/bash

# Start the inch to cm converter website
echo "🚀 Starting Inch to CM Converter Website..."
echo "📁 Project directory: $(pwd)"
echo "🌐 Opening http://localhost:8000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Error: Python is not installed. Please install Python to run the server."
    exit 1
fi