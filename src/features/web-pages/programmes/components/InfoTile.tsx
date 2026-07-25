"use client";

import { ProgrammeItem } from "@/helpers/useTheatreStore";

interface InfoTileProps {
  item: ProgrammeItem;
  width: number;
}

export function InfoTile({ item, width }: InfoTileProps) {
  return (
    <div style={{ width, maxWidth: width, }} className="text-center">
      <p
        className="font-semibold"
        style={{
          color: "#F2A900",
          fontSize: 12,
          marginBottom: 6,
          fontFamily: "Georgia, serif",
        }}
      >
        {item.title}
      </p>
    </div>
  );
}
