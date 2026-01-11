declare module '*.svg' {
    // URL olarak import için
    const src: string;
    export default src;

    // React bileşeni olarak kullanmak için (CRA tarzı API)
    import * as React from 'react';
    export const ReactComponent: React.FC<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
}

// Vite SVGR’in ?react soneki için (opsiyonel)
declare module '*.svg?react' {
    import * as React from 'react';
    const Component: React.FC<
        React.SVGProps<SVGSVGElement> & { title?: string }
    >;
    export default Component;
}
