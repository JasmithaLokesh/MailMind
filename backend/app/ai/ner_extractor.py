from app.ai.model_manager import get_ner

def merge_names(names):

    merged = []

    for name in names:

        name = name.replace("##", "").strip()

        if name:
            merged.append(name)

    return merged


def extract_entities(text: str):

    print("NER 1")

    model = get_ner()

    print("NER 2")

    # Limit text to avoid BERT token overflow
    # safe_text = text[:500]

    # entities = model(
    #     safe_text,
    #     truncation=True
    # )

    safe_text = text[:500]

    print("TEXT LENGTH:", len(safe_text))
    print("TEXT START:")
    print(safe_text[:300])
    print("END OF TEXT")

    entities = model(
        safe_text,
        truncation=True
    )

    print("NER 3")

    people = []
    organizations = []
    locations = []

    for entity in entities:

        label = entity["entity_group"]
        value = entity["word"].strip()

        if label == "PER":
            people.append(value)

        elif label == "ORG":
            organizations.append(value)

        elif label == "LOC":
            locations.append(value)

    people = merge_names(people)
    organizations = merge_names(organizations)
    locations = merge_names(locations)

    print("NER 4")

    return {
        "people": sorted(set(people)),
        "organizations": sorted(set(organizations)),
        "locations": sorted(set(locations))
    }