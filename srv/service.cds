using { sap.galaxy as g } from '../db/model';

service GalacticService @(path : '/galaxy') {
  @restrict: [
    { grant: 'READ', to: ['Viewer','Admin'] },
    { grant: ['CREATE','UPDATE','DELETE'], to: ['Admin'] }
  ]

  entity Spacefarers as projection on g.Spacefarers;
}
