export async function extractTextFromPdf(file: File): Promise<string> {
  try {
    // For simplicity in this example, we'll use a mock implementation
    // In a real implementation, you would use a library like pdf.js or a server-side parser
    const text = await file.text()
    return text
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    return ""
  }
}

export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    // For simplicity in this example, we'll use a mock implementation
    // In a real implementation, you would use a library like mammoth.js
    const text = await file.text()
    return text
  } catch (error) {
    console.error("Error extracting text from DOCX:", error)
    return ""
  }
}
