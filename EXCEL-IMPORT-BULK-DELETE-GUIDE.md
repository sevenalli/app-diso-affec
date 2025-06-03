# 📊 Excel Import & Bulk Delete Guide

## 🎯 Overview

The CMMS system now includes powerful Excel import and bulk delete functionality to help you manage large numbers of engines efficiently.

## ✨ New Features

### 📥 Excel Import
- **Drag & Drop Interface**: Simply drag Excel files into the import area
- **Real-time Validation**: Instant feedback on data quality
- **Error Reporting**: Detailed error messages for invalid data
- **Preview Before Import**: Review all data before committing
- **Bulk Processing**: Import hundreds of engines at once
- **Template Download**: Get a properly formatted Excel template

### 🗑️ Bulk Delete
- **Multi-Selection**: Select multiple engines for deletion
- **Search & Filter**: Find specific engines to delete
- **Safety Confirmation**: Double confirmation before deletion
- **Detailed Preview**: See exactly what will be deleted
- **Error Handling**: Graceful handling of deletion errors

## 📋 How to Use Excel Import

### Step 1: Access Import Feature
1. Navigate to the **Engines** page
2. Click the **"Importer Excel"** button (green button with upload icon)
3. The import modal will open

### Step 2: Download Template (Recommended)
1. Click **"Télécharger le Modèle Excel"** to get the template
2. This ensures your data is in the correct format
3. The template includes:
   - **ID**: Engine identifier (e.g., MM1ET00820)
   - **Désignation**: Engine description
   - **Famille Normalisée**: Engine family
   - **Type**: Must be one of: Levage, Roulants, Accessoires
   - **Heures Fonctionnement**: Operating hours (optional)
   - **Consommation Carburant**: Fuel consumption (optional)

### Step 3: Prepare Your Data
Fill in the Excel template with your engine data:

| ID | Désignation | Famille Normalisée | Type | Heures Fonctionnement | Consommation Carburant |
|---|---|---|---|---|---|
| MM1ET00820 | CHARIOT ELEVATEUR 5T | CHARIOT ELEVATEUR THERMIQUE | Roulants | 1500 | 45.5 |
| MM1ET00821 | GRUE MOBILE 25T | GRUE MOBILE | Levage | 2000 | 85.2 |
| MM1ET00822 | COMPRESSEUR 200L | COMPRESSEUR | Accessoires | 800 | 0 |

### Step 4: Import Your File
1. **Drag & Drop**: Drag your Excel file into the upload area
2. **Or Click**: Click the upload area to select a file
3. **Supported Formats**: .xlsx, .xls, .csv
4. **Automatic Processing**: The system will automatically parse your file

### Step 5: Review & Validate
1. **Preview Data**: Review all parsed engines in the preview table
2. **Check Errors**: Any validation errors will be highlighted
3. **Remove Invalid Rows**: Click the trash icon to remove problematic entries
4. **Verify Counts**: Confirm the number of engines to import

### Step 6: Complete Import
1. Click **"Importer X Engin(s)"** to proceed
2. **Progress Indicator**: Watch the import progress
3. **Success Notification**: Get confirmation of successful imports
4. **Error Summary**: See any engines that failed to import

## 🗑️ How to Use Bulk Delete

### Step 1: Access Bulk Delete
1. Navigate to the **Engines** page
2. Click the **"Suppression Lot"** button (red button with trash icon)
3. The bulk delete modal will open

### Step 2: Find Engines to Delete
1. **Search**: Use the search box to find specific engines
2. **Filter by Type**: Filter engines by type (Levage, Roulants, Accessoires)
3. **Browse List**: Scroll through the complete list

### Step 3: Select Engines
1. **Individual Selection**: Click checkboxes next to specific engines
2. **Select All**: Use "Tout sélectionner" to select all visible engines
3. **Selection Counter**: See how many engines are selected

### Step 4: Review Selection
1. **Verify Selection**: Double-check the engines you've selected
2. **Remove from Selection**: Uncheck any engines you want to keep
3. **Selection Summary**: Review the count of selected engines

### Step 5: Confirm Deletion
1. Click **"Supprimer (X)"** button
2. **Review Warning**: Read the deletion warning carefully
3. **Final Confirmation**: Click **"Supprimer Définitivement"**
4. **Progress**: Watch the deletion progress
5. **Completion**: Get confirmation of successful deletions

## ⚠️ Important Validation Rules

### Excel Import Validation
- **ID**: Required, uppercase letters and numbers only, max 20 characters
- **Désignation**: Required, max 100 characters
- **Famille Normalisée**: Required, max 50 characters
- **Type**: Required, must be exactly: "Levage", "Roulants", or "Accessoires"
- **Operating Hours**: Optional, must be positive number
- **Fuel Consumption**: Optional, must be positive number

### Common Import Errors
- ❌ **Duplicate IDs**: Each engine ID must be unique
- ❌ **Invalid Type**: Type must match exactly (case-sensitive)
- ❌ **Missing Required Fields**: ID, Designation, Family, and Type are required
- ❌ **Invalid Characters**: ID can only contain A-Z and 0-9
- ❌ **Negative Numbers**: Hours and consumption must be positive

## 🛡️ Safety Features

### Import Safety
- **Preview Before Import**: Always review data before importing
- **Validation Errors**: Clear error messages for invalid data
- **Partial Import**: Valid engines import even if some fail
- **Rollback**: Contact admin if you need to undo an import

### Delete Safety
- **Double Confirmation**: Two-step confirmation process
- **Clear Warnings**: Explicit warnings about data loss
- **Preview Selection**: See exactly what will be deleted
- **No Accidental Deletion**: Multiple safeguards prevent mistakes

## 📊 Performance & Limits

### Import Limits
- **File Size**: Up to 10MB Excel files
- **Engine Count**: Up to 1000 engines per import
- **Processing Time**: ~1-2 seconds per 100 engines
- **Memory Usage**: Optimized for large datasets

### Delete Limits
- **Batch Size**: Up to 100 engines per deletion
- **Processing Time**: ~1 second per 50 engines
- **Safety Timeout**: 30-second timeout for large deletions

## 🔧 Troubleshooting

### Import Issues
**Problem**: "File format not supported"
- **Solution**: Use .xlsx, .xls, or .csv files only

**Problem**: "Column not found"
- **Solution**: Download and use the provided template

**Problem**: "Validation errors"
- **Solution**: Check error messages and fix data accordingly

**Problem**: "Import failed"
- **Solution**: Check network connection and try again

### Delete Issues
**Problem**: "Some engines couldn't be deleted"
- **Solution**: Engines may be in use in other systems

**Problem**: "Delete operation timed out"
- **Solution**: Try deleting smaller batches

## 📈 Best Practices

### For Excel Import
1. **Always Use Template**: Download and use the provided template
2. **Validate Data First**: Check your data in Excel before importing
3. **Start Small**: Test with a few engines first
4. **Backup Data**: Keep a copy of your original Excel file
5. **Check Results**: Verify imported data in the engines list

### For Bulk Delete
1. **Double-Check Selection**: Always review what you're deleting
2. **Start Small**: Delete small batches first
3. **Backup First**: Export data before large deletions
4. **Use Filters**: Use search and filters to find specific engines
5. **Verify Results**: Check the engines list after deletion

## 🎯 Example Workflows

### Workflow 1: Initial System Setup
1. Download Excel template
2. Fill template with all your engines
3. Import via Excel import feature
4. Verify all engines imported correctly
5. Set up disponibility and affectation data

### Workflow 2: Regular Maintenance
1. Export current engines to Excel
2. Update data in Excel (add new, modify existing)
3. Use bulk delete to remove old engines
4. Import updated data via Excel import
5. Verify changes are correct

### Workflow 3: System Cleanup
1. Use search and filters to find obsolete engines
2. Select engines for deletion via bulk delete
3. Review selection carefully
4. Confirm deletion
5. Verify cleanup is complete

## 🆘 Support

If you encounter issues:
1. Check this guide for solutions
2. Verify your data format matches the template
3. Try with a smaller dataset
4. Check browser console for error messages
5. Contact system administrator if problems persist

---

**🎉 These powerful features make managing large engine inventories fast and efficient!**
