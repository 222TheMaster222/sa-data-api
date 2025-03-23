import BN from "bn.js";


export function scaleStat(value: number, precision: number): number {
    return value / Math.pow(10, precision);
}

export function sectorToString(sector: BN[]): string {

    const x = sector[0].toNumber();
    const y = sector[1].toNumber();

    return `${x},${y}`
}

export function coordinatesEqual(a: BN[], b: BN[]): boolean {

    return a[0].eq(b[0]) && a[1].eq(b[1])
}