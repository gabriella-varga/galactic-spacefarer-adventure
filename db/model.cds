using { cuid, managed, sap } from '@sap/cds/common';

namespace sap.galaxy;

entity Planets {
  key code : String(10);
      name : String(80);
      descr: String(200);
}

entity Departments {
  key code : String(10);
      name : String(80);
      descr: String(200);
}

entity Positions {
  key code : String(10);
      name : String(80);
      descr: String(200);
}

entity SuitColors {
  key code : String(10);
      name : String(80);
      descr: String(200);
}

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
