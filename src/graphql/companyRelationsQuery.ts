import { gql } from "@apollo/client"

const COMPANY_QUERY = gql`{
    applicantIndividualCompanyRelations
    {
    data {
    id
    name
    }
    }
   }`

export {
    COMPANY_QUERY
}