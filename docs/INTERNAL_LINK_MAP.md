# Internal Link Map

The internal-linking architecture uses published database relationships and descriptive anchor text. Links are rendered as normal Next.js `Link` elements, which output crawlable `<a href>` anchors.

| Page type | Links to | Reason |
| --- | --- | --- |
| Homepage | Categories, individual questions, Learn categories, resources, Practice, search | Establishes the main topic hubs and exposes important public entry points. |
| Categories index | Interview category pages | Groups the category hub pages by role or subject. |
| Interview category page | Homepage, interview question listing, published subtopic filters, individual questions, Practice by category, Learn category, related categories, related resources | Connects each category hub to its real question inventory, relevant learning content, and next actions. |
| Interview category subtopic link | Filtered interview question listing | Sends users to questions for the selected published subcategory without creating a duplicate route. |
| Individual question page | Homepage, interview category, related questions, matching Learn topics, matching Learn category, Practice by category | Connects a long-tail question to its parent hub, genuinely related concepts, and practice. |
| Learn index | Learn category pages | Organizes the learning hub into published study categories. |
| Learn category page | Learn topics, interview category when a matching published category exists | Connects structured lessons back to the relevant interview-question hub. |
| Learn topic page | Prerequisite topics, related topics, previous/next topics, related interview questions, interview category, Practice by category | Supports sequential learning while connecting the lesson to application and assessment. |
| Resource/blog index | Individual resources, resource filters | Provides the resource hub and crawlable article discovery. |
| Resource article | Related resources, related interview questions, matching interview category, matching Learn guide | Connects informational content to relevant commercial/useful preparation paths. |
| Practice page | Category selection and practice workflow | Provides an action destination from category, question, Learn, and resource contexts. |
| Search page | Categories, questions, resources | Supports discovery for users; the route remains `noindex, follow` because results are query-driven. |

## Linking Rules

- Subtopic sections are shown only when the subcategory has published questions.
- Learn links are shown only when a matching published Learn category exists.
- Question-to-Learn links use published topic relations and are limited to three topics.
- Related question and resource lists remain bounded to avoid excessive cross-linking.
- Query filters use existing listing routes rather than creating duplicate URL structures.
- Private, authenticated, and user-specific routes are not used as SEO destinations.
