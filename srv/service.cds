using { sap.galaxy as g } from '../db/model';

service GalacticService @(path : '/galaxy') {
  @restrict: [
    { grant: 'READ',   to: ['Admin', 'Viewer'] },
    { grant: 'CREATE', to: ['Admin'] },
    { grant: 'UPDATE', to: ['Admin'] },
    { grant: 'DELETE', to: ['Admin'] }
  ]

  entity Spacefarers as projection on g.Spacefarers;
}
