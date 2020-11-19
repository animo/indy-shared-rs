from indy_credx import (
    generate_nonce,
    Credential,
    CredentialDefinition,
    CredentialOffer,
    CredentialRequest,
    PresentationRequest,
    Presentation,
    PresentCredentials,
    MasterSecret,
    Schema,
    #    RevocationRegistry,
    RevocationRegistryDefinition,
)


test_did = "55GkHamhTU1ZbTbV2ab9DE"

schema = Schema.create(test_did, "schema name", "schema version", ["attr"], seq_no=15)
print(schema)
print(schema.to_json())

cred_def, cred_def_pvt, key_proof = CredentialDefinition.create(
    test_did, schema, "CL", tag="tag", support_revocation=True
)
print(cred_def.handle)

rev_reg_def, rev_reg_def_private, rev_reg_entry = RevocationRegistryDefinition.create(
    test_did, cred_def, "default", "CL_ACCUM", 100
)

master_secret = MasterSecret.create()
master_secret_id = "my id"

cred_offer = CredentialOffer.create(schema.id, cred_def, key_proof)
print(cred_offer)

cred_req, cred_req_metadata = CredentialRequest.create(
    test_did, cred_def, master_secret, master_secret_id, cred_offer
)

print(cred_req.to_json())

cred = Credential.create(cred_def, cred_def_pvt, cred_offer, cred_req, {"attr": "test"})
print(cred)
print(cred.to_json())

cred_received = cred.process(cred_req_metadata, master_secret, cred_def)
print(cred_received)

pres_req = PresentationRequest.load(
    {
        "name": "proof",
        "version": "1.0",
        "nonce": generate_nonce(),
        "requested_attributes": {
            "reft": {
                "name": "attr",
            }
        },
        "requested_predicates": {},
        "ver": "1.0",
    }
)

present_creds = PresentCredentials()

present_creds.add_attributes(cred_received, "reft", reveal=False)

presentation = Presentation.create(
    pres_req, present_creds, master_secret, [schema], [cred_def]
)
print(presentation)

print(presentation.to_json())

print("Verified:", presentation.verify(pres_req, [schema], [cred_def]))
