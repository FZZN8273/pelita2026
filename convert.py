import docx
import json
import os

INPUT_DOCX = os.path.join("data", "jawaban.docx")
OUTPUT_JSON = "knowledge.json"

print(f"📖 Membaca: {INPUT_DOCX}")
doc = docx.Document(INPUT_DOCX)

knowledge = []
current_keywords = None
current_replies = []
total_paragraphs = 0

for para in doc.paragraphs:
    text = para.text.strip()
    if not text:
        continue
    total_paragraphs += 1
    
    if text.startswith("##"):
        if current_keywords:
            knowledge.append({
                "keywords": current_keywords,
                "replies": current_replies
            })
        keywords_str = text.replace("##", "").strip()
        current_keywords = [k.strip().lower() for k in keywords_str.split(",") if k.strip()]
        current_replies = []
    else:
        if current_keywords:
            current_replies.append(text)

if current_keywords:
    knowledge.append({
        "keywords": current_keywords,
        "replies": current_replies
    })

with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(knowledge, f, indent=2, ensure_ascii=False)

total_keywords = sum(len(item["keywords"]) for item in knowledge)
total_replies = sum(len(item["replies"]) for item in knowledge)
file_size = os.path.getsize(OUTPUT_JSON) / 1024

print(f"✅ Berhasil!")
print(f"   📊 Total topik    : {len(knowledge)}")
print(f"   🔑 Total keywords : {total_keywords}")
print(f"   💬 Total jawaban  : {total_replies}")
print(f"   💾 Ukuran JSON    : {file_size:.2f} KB")
