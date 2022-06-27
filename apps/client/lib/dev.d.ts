import '@chrift/frekl-server';
import '@chrift/frekl-web';
declare function send(groupKey?: string, message?: string | number): void;
declare namespace send {
    var close: () => void;
}
export default send;
//# sourceMappingURL=dev.d.ts.map