namespace sap.galaxy;

entity Spacefarers {
    key ID                      : UUID;
        name                    : String(100);
        stardustCollection      : Integer;
        wormholeNavigationSkill : Integer;
        totalMerit              : Integer;
        originPlanet            : String(100);
        department              : String(100);
        position                : String(100);
        spacesuitColor          : String(100);
}
