import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Target, Crosshair, Smartphone, Hammer, Activity, Wrench, Share2, AlertTriangle, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface InventoryItem {
    id: string;
    name: string;
    description: string;
    type: 'WEAPON' | 'ARMOR' | 'GADGET' | 'VEHICLE';
    image: string;
    icon?: any;
    condition: 'OPERATIONAL' | 'DAMAGED' | 'CRITICAL';
    shared: boolean;
}

const SHARED_INVENTORY: InventoryItem[] = [
    {
        id: "quinjet-access",
        name: "Quinjet Remote Access",
        description: "Standard issue encrypted key for Quinjet piloting and command.",
        type: "VEHICLE",
        image: "https://placehold.co/200x200/1e293b/FFF?text=Quinjet",
        icon: Activity,
        condition: 'OPERATIONAL',
        shared: true
    },
    {
        id: "comms-bead",
        name: "Tactical Comms",
        description: "Sub-vocal communication bead linked to S.H.I.E.L.D. network.",
        type: "GADGET",
        image: "https://placehold.co/200x200/0f172a/FFF?text=Comms",
        icon: Smartphone,
        condition: 'OPERATIONAL',
        shared: true
    },
    {
        id: "medkit",
        name: "Nano-Med Kit",
        description: "Emergency medical nanobots for rapid stabilization.",
        type: "GADGET",
        image: "https://placehold.co/200x200/991b1b/FFF?text=MedKit",
        icon: Activity,
        condition: 'DAMAGED',
        shared: true
    }
];

const INVENTORY_DATA: Record<string, InventoryItem[]> = {
    "iron-man": [
        {
            id: "arc-reactor",
            name: "Arc Reactor Mark 85",
            description: "Nanotech-enabled high-yield energy output node.",
            type: "GADGET",
            image: "https://placehold.co/200x200/0ea5e9/FFF?text=Arc+Reactor",
            icon: Zap,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "repulsor",
            name: "Repulsor Gauntlets",
            description: "Flight stabilizers and concussive energy weapons.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/991b1b/FFF?text=Repulsor",
            icon: Target,
            condition: 'DAMAGED',
            shared: false
        },
        {
            id: "hud-glasses",
            name: "E.D.I.T.H. Interface",
            description: "Augmented reality tactical display glasses.",
            type: "GADGET",
            image: "https://placehold.co/200x200/555/FFF?text=E.D.I.T.H.",
            icon: Smartphone,
            condition: 'OPERATIONAL',
            shared: false
        }
    ],
    "captain-america": [
        {
            id: "shield",
            name: "Vibranium Shield",
            description: "Indestructible disc composed of rare Wakandan metal.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/1e40af/FFF?text=Shield",
            icon: Shield,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "suit",
            name: "Stealth Suit",
            description: "S.H.I.E.L.D. issue tactical uniform with ballistic protection.",
            type: "ARMOR",
            image: "https://placehold.co/200x200/333/FFF?text=Stealth+Suit",
            icon: Shield,
            condition: 'DAMAGED',
            shared: false
        },
        {
            id: "motorcycle",
            name: "Harley-Davidson Street 750",
            description: "Customized urban fast-attack vehicle.",
            type: "VEHICLE",
            image: "https://placehold.co/200x200/000/FFF?text=Motorcycle",
            icon: Activity,
            condition: 'OPERATIONAL',
            shared: false
        }
    ],
    "thor": [
        {
            id: "mjolnir",
            name: "Mjolnir",
            description: "Enchanted Uru hammer. Whosoever holds this hammer...",
            type: "WEAPON",
            image: "https://placehold.co/200x200/475569/FFF?text=Mjolnir",
            icon: Hammer,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "stormbreaker",
            name: "Stormbreaker",
            description: "King's weapon. Capable of summoning the Bifrost.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/475569/FFF?text=Stormbreaker",
            icon: Zap,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "cape",
            name: "Asgardian Cloak",
            description: "Regal fabric resistant to extreme combat conditions.",
            type: "ARMOR",
            image: "https://placehold.co/200x200/991b1b/FFF?text=Cloak",
            icon: Shield,
            condition: 'DAMAGED',
            shared: false
        }
    ],
    "hulk": [
        {
            id: "pants",
            name: "Stretch Fiber Pants",
            description: "Micro-mesh fabric capable of expanding 10x size.",
            type: "ARMOR",
            image: "https://placehold.co/200x200/5b21b6/FFF?text=Pants",
            icon: Shield,
            condition: 'CRITICAL',
            shared: false
        },
        {
            id: "glasses",
            name: "Banner's Spectacles",
            description: "Standard issue prescription glasses. Do not break.",
            type: "GADGET",
            image: "https://placehold.co/200x200/000/FFF?text=Glasses",
            icon: Smartphone,
            condition: 'OPERATIONAL',
            shared: false
        }
    ],
    "black-widow": [
        {
            id: "widows-bite",
            name: "Widow's Bite",
            description: "Electro-shock weapon delivered via wrist gauntlets.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/eab308/000?text=Widow's+Bite",
            icon: Zap,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "batons",
            name: "Dual Batons",
            description: "Electro-shock batons for close quarters combat.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/333/FFF?text=Batons",
            icon: Activity,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "glock",
            name: "Glock 26s",
            description: "Twin subcompact sidearms with silencers.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/555/FFF?text=Glock+26",
            icon: Target,
            condition: 'DAMAGED',
            shared: false
        }
    ],
    "hawkeye": [
        {
            id: "bow",
            name: "Recurve Bow",
            description: "Customized collapsible bow with high tensile strength.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/000/FFF?text=Bow",
            icon: Crosshair,
            condition: 'OPERATIONAL',
            shared: false
        },
        {
            id: "arrows",
            name: "Trick Arrows",
            description: "Quiver containing explosive, EMP, and grapple tips.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/581c87/FFF?text=Trick+Arrows",
            icon: Target,
            condition: 'CRITICAL',
            shared: false
        },
        {
            id: "ronin-sword",
            name: "Ronin Katana",
            description: "Forged steel blade from his time as Ronin.",
            type: "WEAPON",
            image: "https://placehold.co/200x200/991b1b/FFF?text=Katana",
            icon: Activity,
            condition: 'OPERATIONAL',
            shared: false
        }
    ]
};

interface Props {
    heroId: string;
    color: string;
}

export default function AvengerInventory({ heroId, color }: Props) {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
    const personalItems = INVENTORY_DATA[heroId] || [];
    const allItems = [...personalItems, ...SHARED_INVENTORY];

    // Simulate "Repair" action
    const handleRepair = (itemId: string) => {
        alert(`Requisition order submitted for item refurbishment: ${itemId}`);
        // In a real app, this would mutate state/backend
    };

    return (
        <>
            <div className="space-y-8">
                {/* Personal Inventory */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className={`w-1 h-6 bg-gradient-to-b ${color}`} />
                        <h3 className="text-sm font-mono text-primary/70 uppercase tracking-widest">
                            Personal Gear
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {personalItems.map((item, index) => (
                            <InventoryItemCard
                                key={item.id}
                                item={item}
                                index={index}
                                color={color}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                </div>

                {/* Shared Inventory */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1 h-6 bg-slate-500" />
                        <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Team Shared Resources
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {SHARED_INVENTORY.map((item, index) => (
                            <InventoryItemCard
                                key={item.id}
                                item={item}
                                index={index}
                                color="from-slate-500 to-slate-700"
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                </div>

                {allItems.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground font-mono text-xs uppercase tracking-widest border border-dashed border-white/10 rounded-lg">
                        [NO CLASSIFIED GEAR FOUND]
                    </div>
                )}
            </div>

            {/* Item Details Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <ItemDetailModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                        onRepair={handleRepair}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

const ItemDetailModal = ({ item, onClose, onRepair }: { item: InventoryItem, onClose: () => void, onRepair: (id: string) => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        />
        <motion.div
            layoutId={`inventory-${item.id}`}
            className="relative z-[110] bg-slate-900 border border-primary/40 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md"
        >
            <div className="h-48 relative bg-black/50 overflow-hidden group">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {/* HUD Overlay Elements */}
                <div className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none">
                    <div className="absolute top-4 left-4 border-l-2 border-t-2 border-primary/50 w-4 h-4" />
                    <div className="absolute top-4 right-4 border-r-2 border-t-2 border-primary/50 w-4 h-4" />
                    <div className="absolute bottom-4 left-4 border-l-2 border-b-2 border-primary/50 w-4 h-4" />
                    <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-primary/50 w-4 h-4" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-primary/20 transition-all z-20"
                >
                    <span className="sr-only">Close</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="absolute top-4 left-4 z-10">
                    <span className={clsx(
                        "text-[10px] font-mono px-2 py-1 rounded border uppercase tracking-wider backdrop-blur-sm",
                        item.condition === 'OPERATIONAL' ? "bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.2)]" :
                            item.condition === 'DAMAGED' ? "bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]" :
                                "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    )}>
                        STATUS: {item.condition}
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-6 relative overflow-hidden">
                {/* Background Tech GFX */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)] pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold uppercase text-white tracking-widest flex items-center gap-2">
                                {item.name}
                                {item.shared && <Share2 className="w-4 h-4 text-primary/70" />}
                            </h2>
                            <p className="text-primary text-xs font-mono mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                {item.type} CLASS IDENTIFIED
                            </p>
                        </div>
                        <item.icon className="w-8 h-8 text-white/10" />
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-primary/20 pl-3 font-mono">
                        {item.description}
                    </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded border border-white/5 space-y-3 relative overflow-hidden">
                    {/* Scanning Line Animation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-full w-full animate-[scan_2s_ease-in-out_infinite]" />

                    <div className="flex justify-between items-center text-xs font-mono uppercase text-muted-foreground relative z-10">
                        <span>Integrity Analysis</span>
                        <span className={clsx(
                            item.condition === 'OPERATIONAL' ? "text-green-500" :
                                item.condition === 'DAMAGED' ? "text-yellow-500" : "text-red-500"
                        )}>{item.condition === 'OPERATIONAL' ? '100%' : item.condition === 'DAMAGED' ? '64%' : '12%'}</span>
                    </div>

                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative z-10">
                        {/* Bar Background Stripes */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:4px_100%]" />

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: item.condition === 'OPERATIONAL' ? '100%' : item.condition === 'DAMAGED' ? '64%' : '12%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={clsx(
                                "h-full relative",
                                item.condition === 'OPERATIONAL' ? "bg-green-500" :
                                    item.condition === 'DAMAGED' ? "bg-yellow-500" : "bg-red-500"
                            )}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px] animate-[progress_1s_linear_infinite]" />
                        </motion.div>
                    </div>
                </div>

                <div className="pt-2 relative z-10">
                    {item.condition !== 'OPERATIONAL' ? (
                        <button
                            onClick={() => onRepair(item.id)}
                            className="w-full py-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/50 text-yellow-500 uppercase font-bold text-xs tracking-widest flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(234,179,8,0.2)] group/btn relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            <Wrench className="w-4 h-4 relative z-10" />
                            <span className="relative z-10">Submit Repair Order</span>
                        </button>
                    ) : (
                        <div className="w-full py-3 bg-green-500/5 border border-green-500/20 text-green-500/50 uppercase font-bold text-xs tracking-widest flex items-center justify-center gap-2 cursor-not-allowed">
                            <CheckCircle className="w-4 h-4" />
                            Systems Nominal
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    </div>
);

const InventoryItemCard = ({ item, index, color, onClick }: { item: InventoryItem, index: number, color: string, onClick: () => void }) => (
    <motion.div
        layoutId={`inventory-${item.id}`}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        onClick={onClick}
        className="group relative bg-slate-900/50 border border-white/5 hover:border-primary/40 rounded-lg overflow-hidden flex items-center p-2 transition-all hover:bg-slate-900/80 cursor-pointer"
    >
        {/* Scanning Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

        <div className="relative w-20 h-20 flex-shrink-0 bg-black/50 rounded-md overflow-hidden border border-white/5 mr-4 group-hover:border-primary/50 transition-colors">
            <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            {item.condition !== 'OPERATIONAL' && (
                <div className="absolute top-1 right-1 z-10 text-yellow-500 bg-black/80 rounded-full p-0.5">
                    <AlertTriangle className="w-3 h-3" />
                </div>
            )}
            {/* Tech overlay on image */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.8)_50%,transparent_75%)] bg-[length:4px_4px]" />
        </div>

        <div className="flex-1 pr-4">
            <div className="flex justify-between items-start">
                <h4 className="font-bold text-white uppercase tracking-wider text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {item.name}
                </h4>
                <div className="flex gap-2">
                    {item.shared && <Share2 className="w-3 h-3 text-slate-400" />}
                    <span className="text-[10px] font-mono text-primary px-2 py-0.5 border border-primary/30 rounded bg-primary/10">
                        {item.type}
                    </span>
                </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 font-mono leading-relaxed line-clamp-2">
                {item.description}
            </p>

            <div className="flex justify-between items-center mt-2">
                <div className="w-2/3 bg-secondary/30 h-0.5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: item.condition === 'OPERATIONAL' ? "100%" : "60%" }}
                        transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
                        className={clsx(
                            "h-full",
                            item.condition === 'OPERATIONAL' ? `bg-gradient-to-r ${color}` : "bg-red-500"
                        )}
                    />
                </div>
                <span className={clsx(
                    "text-[10px] font-mono uppercase",
                    item.condition === 'OPERATIONAL' ? "text-green-500" : "text-red-400"
                )}>
                    {item.condition === 'OPERATIONAL' ? 'OK' : 'DMG'}
                </span>
            </div>
        </div>
    </motion.div>
);
