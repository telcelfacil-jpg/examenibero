import xml.etree.ElementTree as ET
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
tree1 = ET.parse('c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/estrategia/temp_extract/word/document.xml')
root1 = tree1.getroot()
texts1 = [node.text for node in root1.findall('.//w:t', ns) if node.text]
with open('c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/estrategia/extract_doc1.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(texts1))

tree2 = ET.parse('c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/estrategia/temp2_extract/word/document.xml')
root2 = tree2.getroot()
texts2 = [node.text for node in root2.findall('.//w:t', ns) if node.text]
with open('c:/Users/fsaul/Documents/respaldos antig y gemini/Proyectos/examenIbero/estrategia/extract_doc2.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(texts2))
