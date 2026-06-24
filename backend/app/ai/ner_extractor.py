from transformers import pipeline

ner_model = None


def get_ner():

    global ner_model

    if ner_model is None:

        ner_model = pipeline(
            "ner",
            model="dslim/bert-base-NER",
            aggregation_strategy="simple"
        )

    return ner_model

def merge_names(names):

    merged = []

    i = 0

    while i < len(names):

        current = names[i]

        while (
            i + 1 < len(names)
            and names[i + 1].startswith("##")
        ):

            current += names[i + 1][2:]

            i += 1

        merged.append(current)

        i += 1

    return merged

def extract_entities(text: str):

    print("NER 1")

    model = get_ner()

    print("NER 2")

    entities = model(text)

    print(entities)

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

    print("PEOPLE AFTER MERGE:", people)

    print("NER 4")

    return {

        "people": list(set(people)),
        "organizations": list(set(organizations)),
        "locations": list(set(locations))
    }