using { sap.galaxy as g } from '../db/model';

@impl : 'srv/handlers.js'
@path : 'galaxy'
service GalacticService {
    { grant: 'READ', to: ['Viewer','Admin'] },
    { grant: ['CREATE','UPDATE','DELETE'], to: ['Admin'] }
  @odata.draft.enabled
  @UI.LineItem: [
    { Value: name,                    Label: 'Name'               },
    { Value: role,                    Label: 'Role'               },

    { Value: originPlanet_code,       Label: 'Origin Planet Code' },
    { Value: department.name,         Label: 'Department'         },
    { Value: spacesuitColor.name,     Label: 'Suit Color Code'    },

    { Value: stardustCollection,      Label: 'Stardust #'         },
    { Value: wormholeNavigationSkill, Label: 'Wormhole Nav #'     },
    { Value: totalMerit,              Label: 'Merit Points #'     }
  ]

  entity Spacefarers as projection on g.Spacefarers;
  entity Planets     as projection on g.Planets;
  entity Departments as projection on g.Departments;
  entity Positions   as projection on g.Positions;
  entity SuitColors  as projection on g.SuitColors;
}
