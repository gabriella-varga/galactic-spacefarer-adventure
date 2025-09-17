using { cuid, managed, sap } from '@sap/cds/common';

namespace sap.galaxy;

entity Planets     : sap.common.CodeList { }
entity Departments : sap.common.CodeList { }
entity Positions   : sap.common.CodeList { }
entity SuitColors  : sap.common.CodeList { }

entity Spacefarers : cuid, managed {
    name                    : String(100);
    stardustCollection      : Integer;
    wormholeNavigationSkill : Integer;
    totalMerit              : Integer;
    originPlanet            : Association to Planets;
    department              : Association to Departments;
    position                : Association to Positions;
    spacesuitColor          : Association to SuitColors;
}
