using { sap.galaxy as g } from '../db/model';


@restrict: [
  { grant: 'READ', to: '*' },
  { grant: ['CREATE','UPDATE','DELETE'], to: ['Admin','Recruiter'] }
]

@impl : 'srv/handlers.js'
@path : 'galaxy'
service GalacticService {

  @odata.draft.enabled
  @odata.draft.bypass
  entity Spacefarers as projection on g.Spacefarers;
  entity Planets     as projection on g.Planets;
  entity Departments as projection on g.Departments;
  entity Positions   as projection on g.Positions;
  entity SuitColors  as projection on g.SuitColors;
}
