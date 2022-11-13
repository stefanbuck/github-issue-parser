// Helper function to parse the body of the issue template
// :param body: The body of the issue template
// :return: A dictionary of the parsed body
export async function parse(body) {
    var parsed_issue_body_dict = {}

    // Split the body up by the section headers
    const issue_body_sections_list = body.split("###")

    // Remove the first element of the list, which is empty
    issue_body_sections_list.shift()

    // Loop over the list of sections
    for (const section of issue_body_sections_list) {
        // Split out the issue body sections
        let issue_body = section.split("\r\n\r\n")

        // make the key lowercase and snake case
        let key = issue_body[0].trim().toLowerCase().replace(/ /g, '_')

        // get the value from the body as well
        let value = issue_body[1].trim()

        // If the value for a field is empty, set it to null
        if (value === "_No response_") {
            value = null
        }

        // Add the key-value pair to the dictionary
        parsed_issue_body_dict[key] = value
    }

    const parsed_json = JSON.stringify(parsed_issue_body_dict, null, 2)

    // Return the dictionary
    return parsed_json
}
