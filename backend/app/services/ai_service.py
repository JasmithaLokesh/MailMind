def calculate_priority(category, confidence):

    priority = confidence * 100

    if category == "Job interview invitation":
        priority += 50

    elif category == "Internship opportunity":
        priority += 45

    elif category == "Campus placement email":
        priority += 45

    elif category == "Recruiter communication":
        priority += 40

    elif category == "Meeting invitation":
        priority += 30

    elif category == "Assignment submission":
        priority += 25

    elif category == "Deadline reminder":
        priority += 25

    elif category == "Promotional email":
        priority -= 15

    elif category == "Newsletter":
        priority -= 10

    return min(max(priority, 0), 100)