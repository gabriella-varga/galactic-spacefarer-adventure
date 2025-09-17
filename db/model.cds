using {
    cuid,
    managed
} from '@sap/cds/common';

namespace sap.galaxy;

type Code        : String(10);
type Name        : String(80);
type Description : String(200);

type Stardust    : Integer @assert.range: [
    0,
    1000
];

type WormholeNav : Integer @assert.range: [
    1,
    10
];

type MeritPoints : Integer;

type Role        : String enum {
    Admin;
    Viewer;
    Cadet;
}

entity Planets : cuid {
    key code  : Code;
        name  : Name;
        descr : Description;
}

entity Departments {
    key code  : Code;
        name  : Name;
        descr : Description;
}

entity Positions {
    key code  : Code;
        name  : Name;
        descr : Description;
}

entity SuitColors {
    key code  : Code;
        name  : Name;
        descr : Description;
}

entity Spacefarers : cuid {
    name                    : Name @mandatory;
    email                   : String(150);
    stardustCollection      : Stardust default 0;
    wormholeNavigationSkill : WormholeNav default 0;
    totalMerit              : MeritPoints default 0;

    originPlanet            : Association to Planets;
    department              : Association to Departments;
    position                : Association to Positions;
    spacesuitColor          : Association to SuitColors;
    role                    : Role default #Cadet;
}