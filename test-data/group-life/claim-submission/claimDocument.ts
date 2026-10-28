export const claimSubmissionDocumentData = {
    target: {
        submissionNo: "2026100054",
        policyNo: "GT00222610",
        policyHolder: "Cozy Quality Assurance",
        product: "Asuransi Corporate Eazy (COZY)",
        participantName: "Inbal Avraham",
    },

    remarks: 'Automation Testing 2',

    documents: [
        {
            documentName: 'Formulir klaim yang telah diisi dan ditandatangani oleh Pemegang Polis',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'Copy KTP Pemegang Polis dan/atau Tertanggung',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'COZY Claim Supporting Document',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'Resume medis (asli/copy legalisir)',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'Surat keterangan kecelakaan dari kepolisian atau pihak yang berwenang, jika akibat kecelakaan',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'Copy buku tabungan Tertanggung atau Pemegang Polis',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'Form Cacat Tetap Total yang diisi oleh dokter yang merawat, dilengkapi dengan foto',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
        {
            documentName: 'E-Polis',
            fileRelativePath:
            'test-data/group-life/claim-submission/documents/cozy-claim/testing.pdf',
        },
    ],
} as const;