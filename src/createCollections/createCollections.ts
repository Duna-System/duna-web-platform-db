import dotenv from 'dotenv';
import { createUserCollectionWithValidation } from '../users/validationDbUsers';
import { createProjectCollectionWithValidation } from '../projects/validationProjectsDb';
import { createEntityCollectionWithValidation } from '../entity/validationEntityDb';

dotenv.config();

export async function createCollectionsWithValidations(
    uri: string,
    databaseName: string,
): Promise<void> {
    try {
        await createUserCollectionWithValidation(uri, databaseName, 'users');
        await createProjectCollectionWithValidation(uri, databaseName, 'projects');
        await createEntityCollectionWithValidation(uri, databaseName, 'entities');
    } catch (error) {
        console.error('Error creating collections:', error);
    }
}

