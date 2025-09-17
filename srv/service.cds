using { sap.galaxy as g } from '../db/model';

service GalacticService @(path : '/galaxy') {
  entity Spacefarers as projection on g.Spacefarers;
}
