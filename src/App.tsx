import { useState, CSSProperties } from "react";

const theme = {
  cream: "#F5F0E8",
  green: "#2D5A3D",
  greenLight: "#4A7C5F",
  greenPale: "#E8F0EA",
  amber: "#C8883A",
  amberLight: "#F5E6D0",
  brown: "#5C4033",
  gray: "#9A9088",
  grayLight: "#EDE8E0",
  white: "#FDFAF6",
};

interface Item {
  id: number;
  name: string;
  owner: string;
  ownerInitial: string;
  distance: string;
  days: number;
  pts: number;
  category: string;
  available: boolean;
  img: string;
  description: string;
}

interface MyItem {
  id: number;
  name: string;
  pts: number;
  category: string;
  img: string;
  borrowed: boolean;
  borrower?: string;
  until?: string;
}

const mockItems: Item[] = [
  { id: 1, name: "Boormachine Bosch", owner: "Pieter V.", ownerInitial: "P", distance: "200m", days: 3, pts: 3, category: "gereedschap", available: true, img: "🔧", description: "Krachtige Bosch accuschroefmachine, inclusief bits." },
  { id: 2, name: "Hogedrukspuit", owner: "Lien D.", ownerInitial: "L", distance: "450m", days: 2, pts: 2, category: "tuin", available: true, img: "💧", description: "Kärcher K5, ideaal voor terras of auto." },
  { id: 3, name: "Tentzeil 3x3m", owner: "Thomas M.", ownerInitial: "T", distance: "600m", days: 5, pts: 5, category: "feest", available: false, img: "⛺", description: "Wit tentzeil met stalen frame, voor 20 personen." },
  { id: 4, name: "Tafelzaag", owner: "Marc B.", ownerInitial: "M", distance: "800m", days: 1, pts: 1, category: "gereedschap", available: true, img: "🪚", description: "Evolution R255SMS tafelzaag. Ophalen en terugbrengen." },
  { id: 5, name: "Aanhangwagen", owner: "Sofie R.", ownerInitial: "S", distance: "1.1km", days: 4, pts: 4, category: "transport", available: true, img: "🚛", description: "Kleine aanhangwagen 750kg. Rijbewijs B voldoende." },
  { id: 6, name: "Betonmixer 140L", owner: "Jan K.", ownerInitial: "J", distance: "300m", days: 2, pts: 2, category: "gereedschap", available: true, img: "🏗️", description: "Elektrische betonmixer, 140L inhoud." },
];

const myItems: MyItem[] = [
  { id: 10, name: "Campingstoel (x4)", pts: 1, category: "feest", img: "🪑", borrowed: false },
  { id: 11, name: "Laserapparaat", pts: 2, category: "gereedschap", img: "📡", borrowed: true, borrower: "Alex T.", until: "18 apr" },
  { id: 12, name: "Trap 3m", pts: 1, category: "gereedschap", img: "🪜", borrowed: false },
];

const categories = ["allemaal", "gereedschap", "tuin", "feest", "transport"];
const catLabels: Record<string, string> = { allemaal: "Alles", gereedschap: "Gereedschap", tuin: "Tuin", feest: "Feest", transport: "Transport" };

const categoryColors: Record<string, { bg: string; color: string }> = {
  gereedschap: { bg: "#E8F0EA", color: "#2D5A3D" },
  tuin: { bg: "#E8F5E0", color: "#3A6B2A" },
  feest: { bg: "#F5EAD8", color: "#8B5E2A" },
  transport: { bg: "#E8EAF5", color: "#2A3A8B" },
};

const s: Record<string, CSSProperties> = {
  app: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: theme.cream, minHeight: "100vh", maxWidth: 390, margin: "0 auto", position: "relative", overflow: "hidden", boxShadow: "0 0 60px rgba(0,0,0,0.15)" },
  header: { background: theme.green, padding: "52px 24px 20px", position: "relative" },
  logo: { fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" },
  logoSpan: { color: theme.amber },
  subtitle: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 2 },
  pointsBadge: { position: "absolute", top: 50, right: 24, background: theme.amber, borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center", gap: 5 },
  pointsText: { fontSize: 14, fontWeight: 700, color: "#fff" },
  pointsLabel: { fontSize: 11, color: "rgba(255,255,255,0.8)" },
  content: { padding: "0 0 90px", minHeight: "calc(100vh - 140px)" },
  section: { padding: "20px 20px 0" },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: theme.brown, marginBottom: 14, letterSpacing: "-0.3px" },
  catScroll: { display: "flex", gap: 8, padding: "18px 20px 12px", overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" } as CSSProperties,
  itemCard: { background: theme.white, borderRadius: 16, padding: "16px", marginBottom: 10, display: "flex", gap: 14, alignItems: "center", cursor: "pointer", border: `1.5px solid ${theme.grayLight}` },
  itemEmoji: { width: 52, height: 52, background: theme.greenPale, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 },
  itemName: { fontSize: 15, fontWeight: 700, color: theme.brown, marginBottom: 3 },
  itemMeta: { fontSize: 12, color: theme.gray },
  itemRight: { marginLeft: "auto", textAlign: "right" as const, flexShrink: 0 },
  ptsBadge: { background: theme.amberLight, color: theme.amber, borderRadius: 10, padding: "4px 10px", fontSize: 12, fontWeight: 700, display: "inline-block" },
  availableDot: { width: 8, height: 8, borderRadius: "50%", background: "#5AAF7A", display: "inline-block", marginRight: 5 },
  unavailableDot: { width: 8, height: 8, borderRadius: "50%", background: "#ccc", display: "inline-block", marginRight: 5 },
  nav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 390, background: theme.white, borderTop: `1.5px solid ${theme.grayLight}`, display: "flex", padding: "12px 0 20px" },
  detailOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "flex-end", maxWidth: 390, left: "50%", transform: "translateX(-50%)" },
  detailSheet: { background: theme.white, borderRadius: "24px 24px 0 0", padding: "28px 24px 40px", width: "100%" },
  handle: { width: 40, height: 4, background: theme.grayLight, borderRadius: 4, margin: "0 auto 20px" },
  detailEmoji: { width: 70, height: 70, background: theme.greenPale, borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 14 },
  detailName: { fontSize: 22, fontWeight: 800, color: theme.brown, marginBottom: 6, letterSpacing: "-0.4px" },
  detailDesc: { fontSize: 14, color: theme.gray, lineHeight: 1.6, marginBottom: 20 },
  infoRow: { display: "flex", gap: 10, marginBottom: 20 },
  ownerRow: { display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderTop: `1.5px solid ${theme.grayLight}`, borderBottom: `1.5px solid ${theme.grayLight}`, marginBottom: 20 },
  ownerName: { fontSize: 14, fontWeight: 700, color: theme.brown },
  ownerSub: { fontSize: 12, color: theme.gray },
  successMsg: { textAlign: "center" as const, color: theme.greenLight, fontSize: 15, fontWeight: 600, padding: "16px", background: theme.greenPale, borderRadius: 16 },
  myItemCard: { background: theme.white, borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", alignItems: "center", gap: 14, border: `1.5px solid ${theme.grayLight}` },
  borrowedBadge: { fontSize: 11, fontWeight: 700, color: theme.amber, background: theme.amberLight, borderRadius: 8, padding: "3px 8px", display: "inline-block", marginTop: 3 },
  profileHeader: { background: theme.green, padding: "52px 24px 30px", display: "flex", alignItems: "center", gap: 18 },
  bigAvatar: { width: 64, height: 64, borderRadius: "50%", background: theme.amber, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 26, flexShrink: 0 },
  profileName: { fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" },
  profileSub: { fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 },
  statGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "20px 20px 0" },
  statCard: { background: theme.white, borderRadius: 16, padding: "16px 12px", textAlign: "center" as const, border: `1.5px solid ${theme.grayLight}` },
  statNum: { fontSize: 24, fontWeight: 800, color: theme.green, letterSpacing: "-0.5px" },
  statLabel: { fontSize: 11, color: theme.gray, marginTop: 3 },
  addBtn: { position: "fixed", bottom: 80, right: "calc(50% - 185px)", width: 52, height: 52, background: theme.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff", boxShadow: "0 4px 20px rgba(45,90,61,0.4)", cursor: "pointer", border: "none" },
  addSheet: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "flex-end", maxWidth: 390, left: "50%", transform: "translateX(-50%)" },
  addContent: { background: theme.white, borderRadius: "24px 24px 0 0", padding: "28px 24px 48px", width: "100%" },
  input: { width: "100%", padding: "12px 14px", border: `1.5px solid ${theme.grayLight}`, borderRadius: 12, fontSize: 14, background: theme.cream, color: theme.brown, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, fontFamily: "inherit" },
  label: { fontSize: 12, fontWeight: 700, color: theme.gray, marginBottom: 5, display: "block", textTransform: "uppercase" as const, letterSpacing: "0.5px" },
};

const catChip = (active: boolean): CSSProperties => ({
  padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: active ? 700 : 500,
  background: active ? theme.green : theme.white, color: active ? "#fff" : theme.gray,
  border: `1.5px solid ${active ? theme.green : theme.grayLight}`, cursor: "pointer",
  whiteSpace: "nowrap", flexShrink: 0,
});

const infoChip = (color?: { bg: string; color: string }): CSSProperties => ({
  background: color?.bg || theme.greenPale, color: color?.color || theme.green,
  borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600,
});

const avatar = (color?: string): CSSProperties => ({
  width: 40, height: 40, borderRadius: "50%", background: color || theme.green,
  display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0,
});

const btnPrimary = (disabled: boolean): CSSProperties => ({
  width: "100%", padding: "16px", background: disabled ? theme.grayLight : theme.green,
  color: disabled ? theme.gray : "#fff", border: "none", borderRadius: 16,
  fontSize: 16, fontWeight: 700, cursor: disabled ? "default" : "pointer",
});

const navItem = (active: boolean): CSSProperties => ({
  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
  gap: 4, cursor: "pointer", color: active ? theme.green : theme.gray,
});

export default function LeenBuur() {
  const [screen, setScreen] = useState("discover");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [activeCategory, setActiveCategory] = useState("allemaal");
  const [requested, setRequested] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const points = 12;

  const filtered = mockItems.filter(i => activeCategory === "allemaal" || i.category === activeCategory);

  const DiscoverScreen = () => (
    <>
      <div style={s.header}>
        <div style={s.logo}>Leen<span style={s.logoSpan}>Buur</span></div>
        <div style={s.subtitle}>Hoeilaart · Deel & Leen</div>
        <div style={s.pointsBadge}><span style={s.pointsText}>{points}</span><span style={s.pointsLabel}>pts</span></div>
      </div>
      <div style={s.content}>
        <div style={s.catScroll}>
          {categories.map(c => (
            <button key={c} style={catChip(activeCategory === c)} onClick={() => setActiveCategory(c)}>{catLabels[c]}</button>
          ))}
        </div>
        <div style={s.section}>
          <div style={s.sectionTitle}>Beschikbaar in de buurt</div>
          {filtered.map(item => (
            <div key={item.id} style={s.itemCard} onClick={() => { setSelectedItem(item); setRequested(false); }}>
              <div style={s.itemEmoji}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={s.itemName}>{item.name}</div>
                <div style={s.itemMeta}>
                  <span style={item.available ? s.availableDot : s.unavailableDot} />
                  {item.available ? "Beschikbaar" : "Uitgeleend"} · {item.distance}
                </div>
              </div>
              <div style={s.itemRight}>
                <div style={s.ptsBadge}>{item.days} pt/dag</div>
                <div style={{ fontSize: 11, color: theme.gray, marginTop: 4 }}>{item.owner}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const MyItemsScreen = () => (
    <>
      <div style={s.header}>
        <div style={s.logo}>Mijn <span style={s.logoSpan}>Spullen</span></div>
        <div style={s.subtitle}>Wat jij uitleent aan de buurt</div>
        <div style={s.pointsBadge}><span style={s.pointsText}>{points}</span><span style={s.pointsLabel}>pts</span></div>
      </div>
      <div style={s.content}>
        <div style={s.section}>
          <div style={{ ...s.sectionTitle, paddingTop: 8 }}>Jouw aanbod</div>
          {myItems.map(item => (
            <div key={item.id} style={s.myItemCard}>
              <div style={{ ...s.itemEmoji, width: 46, height: 46, fontSize: 22 }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={s.itemName}>{item.name}</div>
                {item.borrowed
                  ? <div style={s.borrowedBadge}>📤 Bij {item.borrower} t.e.m. {item.until}</div>
                  : <div style={{ fontSize: 12, color: "#5AAF7A", fontWeight: 600 }}>✓ Beschikbaar</div>
                }
              </div>
              <div style={s.ptsBadge}>{item.pts} pt/dag</div>
            </div>
          ))}
          <div style={{ padding: "10px 0 0", fontSize: 13, color: theme.gray, textAlign: "center" }}>
            Druk op <strong style={{ color: theme.green }}>+</strong> om een voorwerp toe te voegen
          </div>
        </div>
      </div>
      <button style={s.addBtn} onClick={() => setAddOpen(true)}>+</button>
    </>
  );

  const ProfileScreen = () => (
    <>
      <div style={s.profileHeader}>
        <div style={s.bigAvatar}>K</div>
        <div>
          <div style={s.profileName}>Kev</div>
          <div style={s.profileSub}>Hoeilaart · Lid sinds april 2026</div>
        </div>
      </div>
      <div style={s.statGrid}>
        {[{ num: points, label: "Punten" }, { num: 3, label: "Uitgeleend" }, { num: 7, label: "Geleend" }].map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statNum}>{st.num}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>
      <div style={{ ...s.section, paddingTop: 20 }}>
        <div style={s.sectionTitle}>Hoe werkt het</div>
        {[
          ["🔧", "Jij leent → punten komen erbij", "1 punt per dag dat jouw voorwerp wordt gebruikt."],
          ["📦", "Jij leent → punten gaan eraf", "Leen iemands spullen en betaal in punten."],
          ["🤝", "Alleen voor Hoeilaart", "Enkel buren uit de gemeente kunnen meedoen."],
        ].map(([icon, title, sub]) => (
          <div key={title} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
            <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: theme.brown }}>{title}</div>
              <div style={{ fontSize: 13, color: theme.gray, marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const ItemDetail = () => {
    if (!selectedItem) return null;
    const catColor = categoryColors[selectedItem.category];
    return (
      <div style={s.detailOverlay} onClick={() => setSelectedItem(null)}>
        <div style={s.detailSheet} onClick={e => e.stopPropagation()}>
          <div style={s.handle} />
          <div style={s.detailEmoji}>{selectedItem.img}</div>
          <div style={s.detailName}>{selectedItem.name}</div>
          <div style={s.detailDesc}>{selectedItem.description}</div>
          <div style={s.infoRow}>
            <div style={infoChip(catColor)}>{catLabels[selectedItem.category]}</div>
            <div style={infoChip({ bg: theme.amberLight, color: theme.amber })}>{selectedItem.days} pt/dag</div>
            <div style={infoChip({ bg: theme.greenPale, color: theme.greenLight })}>{selectedItem.distance}</div>
          </div>
          <div style={s.ownerRow}>
            <div style={avatar(theme.greenLight)}>{selectedItem.ownerInitial}</div>
            <div>
              <div style={s.ownerName}>{selectedItem.owner}</div>
              <div style={s.ownerSub}>Hoeilaart · ⭐ 4.9</div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 22, cursor: "pointer" }}>💬</div>
          </div>
          {requested
            ? <div style={s.successMsg}>✅ Aanvraag verzonden! {selectedItem.owner} wordt verwittigd.</div>
            : <button style={btnPrimary(!selectedItem.available)} onClick={() => selectedItem.available && setRequested(true)}>
                {selectedItem.available ? "Aanvragen" : "Momenteel uitgeleend"}
              </button>
          }
        </div>
      </div>
    );
  };

  const AddSheet = () => (
    <div style={s.addSheet} onClick={() => setAddOpen(false)}>
      <div style={s.addContent} onClick={e => e.stopPropagation()}>
        <div style={s.handle} />
        <div style={{ fontSize: 18, fontWeight: 800, color: theme.brown, marginBottom: 20 }}>Voorwerp toevoegen</div>
        <label style={s.label}>Naam</label>
        <input style={s.input} placeholder="bv. Boormachine, Tent, Ladder…" />
        <label style={s.label}>Beschrijving</label>
        <input style={s.input} placeholder="Korte omschrijving…" />
        <label style={s.label}>Categorie</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {["gereedschap", "tuin", "feest", "transport"].map(c => (
            <button key={c} style={{ ...catChip(false), padding: "6px 14px" }}>{catLabels[c]}</button>
          ))}
        </div>
        <button style={btnPrimary(false)} onClick={() => setAddOpen(false)}>Toevoegen</button>
      </div>
    </div>
  );

  return (
    <div style={s.app}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: 'DM Sans', sans-serif; }
        input { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {screen === "discover" && <DiscoverScreen />}
      {screen === "myitems" && <MyItemsScreen />}
      {screen === "profile" && <ProfileScreen />}
      {selectedItem && <ItemDetail />}
      {addOpen && <AddSheet />}

      <nav style={s.nav}>
        {[
          { id: "discover", icon: "🔍", label: "Ontdekken" },
          { id: "myitems", icon: "📦", label: "Mijn spullen" },
          { id: "profile", icon: "👤", label: "Profiel" },
        ].map(tab => (
          <div key={tab.id} style={navItem(screen === tab.id)} onClick={() => { setScreen(tab.id); setSelectedItem(null); setAddOpen(false); }}>
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{ fontSize: 10, fontWeight: screen === tab.id ? 700 : 500 }}>{tab.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}
