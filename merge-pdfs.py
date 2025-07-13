#!/usr/bin/env python3
import subprocess
import sys

# Install PyPDF2 if not already installed
try:
    import PyPDF2
except ImportError:
    print("Installing PyPDF2...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "--user", "PyPDF2"])
    import PyPDF2

import os

def merge_pdfs():
    # Check if files exist
    if not os.path.exists('public/omslag-complete.pdf'):
        print("Error: public/omslag-complete.pdf not found!")
        return
    
    if not os.path.exists('e-book_weedyourskin.pdf'):
        print("Error: e-book_weedyourskin.pdf not found!")
        return
    
    print("Merging PDFs...")
    
    # Create PDF merger
    merger = PyPDF2.PdfMerger()
    
    try:
        # Add cover PDF
        print("Adding cover...")
        merger.append('public/omslag-complete.pdf')
        
        # Add main book PDF
        print("Adding main book...")
        merger.append('e-book_weedyourskin.pdf')
        
        # Write merged PDF
        output_file = 'merged-ebook.pdf'
        print(f"Writing merged PDF to {output_file}...")
        merger.write(output_file)
        merger.close()
        
        # Get file sizes
        cover_size = os.path.getsize('public/omslag-complete.pdf') / (1024*1024)
        main_size = os.path.getsize('e-book_weedyourskin.pdf') / (1024*1024)
        merged_size = os.path.getsize(output_file) / (1024*1024)
        
        print(f"\nSuccess! Files merged:")
        print(f"  Cover: {cover_size:.1f} MB")
        print(f"  Main book: {main_size:.1f} MB")
        print(f"  Merged: {merged_size:.1f} MB")
        print(f"\nMerged file saved as: {output_file}")
        
        # Rename files
        print("\nRenaming files...")
        os.rename('e-book_weedyourskin.pdf', 'e-book_weedyourskin_backup.pdf')
        os.rename(output_file, 'e-book_weedyourskin.pdf')
        print("Done! The merged file is now e-book_weedyourskin.pdf")
        
    except Exception as e:
        print(f"Error merging PDFs: {e}")
        merger.close()

if __name__ == "__main__":
    merge_pdfs() 