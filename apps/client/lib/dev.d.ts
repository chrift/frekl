import 'server/lib';
import 'web/server';
declare function send(groupKey?: string, message?: string | number): void;
declare namespace send {
    var close: () => void;
}
export default send;
//# sourceMappingURL=dev.d.ts.map