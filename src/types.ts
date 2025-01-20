import { MiddsMusicalWorkMusicalWork, MiddsStakeholderStakeholder } from './interfaces/allfeat';
import { MusicalWorkInputs } from './midds/musicalWork';
import { StakeholderInputs } from './midds/stakeholder';

export type AllfeatNetwork = 'melodie' | 'devnet';
export type MiddsSubstrateType = MiddsStakeholderStakeholder | MiddsMusicalWorkMusicalWork;
export type MiddsInputs = StakeholderInputs | MusicalWorkInputs;
