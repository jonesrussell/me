branding:

- title: "Limitless Developer"
- description: "Building elegant solutions with modern web technologies"

general_rules:

- use_typescript: true
- add_comments: true
- maintain_documentation: true

code_style:

- use_semicolons: true
- use_strict_types: true
- prefer_const: true
- max_line_length: 100
- indent_style: tabs
- indent_size: 2

svelte_patterns:

- use_runes: true
- prefer\_$state_over_let: true
- prefer\_$derived_over_computed: true
- use\_$effect_for_side_effects: true
- use_typescript_for_props: true
- keep_components_small: true
- use_semantic_html: true

testing_guidelines:

- write_unit_tests: true
- test_components_in_isolation: true
- test_user_interactions: true
- test_state_management: true
- test_accessibility: true
- test_error_cases: true
- use_vitest_and_testing_library: true

monospace_design:

- use_monospace_fonts: true
- align_to_character_grid: true
- use_consistent_spacing: true
- maintain_visual_hierarchy: true
- height_calculations:
  - count_exact_content_lines: true
  - multiply_only_content_by_line_height: true
  - add_fixed_spacing_after_line_height: true
  - account_for_all_css_factors:
    - line_height
    - header_height
    - body_padding
    - element_margins
    - element_gaps
    - safety_padding
  - document_all_spacing_factors: true
  - prefer_whole_character_units: true

best_practices:

- handle_errors_gracefully: true
- validate_user_input: true
- optimize_performance: true
- follow_accessibility_standards: true
- use_semantic_versioning: true
- keep_dependencies_updated: true
