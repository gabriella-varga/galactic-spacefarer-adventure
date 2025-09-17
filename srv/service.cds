using { sap.galaxy as g } from '../db/model';

@impl : 'srv/handlers.js'
@path : 'galaxy'
service GalacticService {
    { grant: 'READ', to: ['Viewer','Admin'] },
    { grant: ['CREATE','UPDATE','DELETE'], to: ['Admin'] }
  @UI.LineItem: [
    { Value: name,                    Label: 'Name',                  Importance: #High },
    { Value: role,                    Label: 'Role',                  Importance: #High },

    { Value: originPlanet_code,       Label: 'Origin Planet Code',    Importance: #High },
    { Value: department.name,         Label: 'Department',            Importance: #High },
    { Value: spacesuitColor.name,     Label: 'Suit Color Code',       Importance: #High },

    { Value: stardustCollection,      Label: 'Stardust #',            Importance: #High },
    { Value: wormholeNavigationSkill, Label: 'Wormhole Nav #',        Importance: #High },
    { Value: totalMerit,              Label: 'Merit Points #',        Importance: #High }
  ]

  entity Spacefarers as projection on g.Spacefarers;
  entity Planets     as projection on g.Planets;
  entity Departments as projection on g.Departments;
  entity Positions   as projection on g.Positions;
  entity SuitColors  as projection on g.SuitColors;
}
