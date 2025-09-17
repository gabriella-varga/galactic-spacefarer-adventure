using { sap.galaxy as g } from '../db/model';

@impl : 'srv/handlers.js'
service GalacticService @(path : '/galaxy') {
  @restrict: [
    { grant: 'READ', to: ['Viewer','Admin'] },
    { grant: ['CREATE','UPDATE','DELETE'], to: ['Admin'] }
  ]

  entity Spacefarers as projection on g.Spacefarers;
  entity Planets     as projection on g.Planets;
  entity Departments as projection on g.Departments;
  entity Positions   as projection on g.Positions;
  entity SuitColors  as projection on g.SuitColors;
}
