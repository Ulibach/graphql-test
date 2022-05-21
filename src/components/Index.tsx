import { useQuery } from '@apollo/client';
import { Dialog, DialogTitle, DialogContent, Card, CardContent, DialogActions, Button, Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { APPLICANT_QUERY } from '../graphql/applicantIndividualCompanyPositionsQuery';
import { COMPANY_QUERY } from '../graphql/companyRelationsQuery';
import CustomAutocomplete from './CustomAutocomplete';


const Index: React.FC = ({}) => {
    const {data: companyRel} = useQuery(COMPANY_QUERY)
    const {data: companyPos} = useQuery(APPLICANT_QUERY)
    const [entity, setEntity] = useState<string>()
        return (
            <div className="App" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
              }}>
                <Dialog   fullWidth
                maxWidth="sm" open={true}>
                  <DialogTitle>Add</DialogTitle>
                  <DialogContent>
                    <Card>
                      <DialogTitle>Details</DialogTitle>
                      <CardContent>
                          <CustomAutocomplete 
                          options={[
                            {name: 'Company', id: 0},
                            {name: 'Individual', id: 1}
                          ]} 
                          label="Entity"
                          onChangeFn={(s: string) => setEntity(s)}
                          />

                        <CustomAutocomplete 
                          options={[{name: '', id: 0}]} 
                          label="Client ID"
                          />

                          {entity == 'Company' &&
<TextField sx={{width: '100%'}} label="Company Name" />
                          }

                        {entity == 'Individual' && 
                            <>
                            <TextField sx={{width: '100%'}} label="First Name" />
                            <TextField sx={{width: '100%', 
                            marginTop: "30px"}} label="Last Name" />
                            </>
                        }


                      </CardContent>
                    </Card>
                    <Card style={{
                      marginTop: '25px'
                    }}>
                      <CardContent>
                      <CustomAutocomplete 
                          options={
                            companyRel?.applicantIndividualCompanyRelations?.data ?
                            [...companyRel?.applicantIndividualCompanyRelations?.data]
                            :
                            [{name: '', id: 0}]
                          }
                          label="Relation to the Company"
                          />
                            <CustomAutocomplete 
                          options={
                            companyPos?.applicantIndividualCompanyPositions?.data ?
                            [...companyPos?.applicantIndividualCompanyPositions?.data]
                            :
                            [{name: '', id: 0}]
                          } 
                          label="Position in the Company"
                          />
                      </CardContent>
                    </Card>
                  </DialogContent>
                  <DialogActions>
                    <Button>Cancel</Button>
                    <Button>Add</Button>
                  </DialogActions>
                </Dialog>
          
              </div>
        );
}
export default Index