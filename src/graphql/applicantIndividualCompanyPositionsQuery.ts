import { gql } from "@apollo/client";

const APPLICANT_QUERY = gql`
{
    applicantIndividualCompanyPositions
    {
    data {
    id
    name
    }
    }}
`

export {
    APPLICANT_QUERY
}